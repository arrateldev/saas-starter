import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import { users, teams, teamMembers } from '@/lib/db/schema';
import { setSession } from '@/lib/auth/session';
import { NextRequest, NextResponse } from 'next/server';
import {
  getMockCheckoutSession,
  getStripeClient,
  isMockStripeEnabled
} from '@/lib/payments/stripe';
import Stripe from 'stripe';
import { defaultLocale, isLocale, localizePath } from '@/lib/i18n/config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');
  const localeValue = searchParams.get('locale');
  const locale =
    localeValue && isLocale(localeValue) ? localeValue : defaultLocale;

  if (!sessionId) {
    return NextResponse.redirect(
      new URL(localizePath(locale, '/pricing'), request.url)
    );
  }

  try {
    let customerId: string;
    let subscriptionId: string;
    let productId: string;
    let planName: string;
    let subscriptionStatus: string;
    let userId: string;

    if (isMockStripeEnabled()) {
      const mockSession = getMockCheckoutSession(sessionId);

      if (!mockSession) {
        throw new Error('Invalid mock checkout session.');
      }

      customerId = mockSession.customerId;
      subscriptionId = mockSession.subscriptionId;
      productId = mockSession.productId;
      planName = mockSession.planName;
      subscriptionStatus = mockSession.subscriptionStatus;
      userId = mockSession.userId.toString();
    } else {
      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['customer', 'subscription']
      });

      if (!session.customer || typeof session.customer === 'string') {
        throw new Error('Invalid customer data from Stripe.');
      }

      customerId = session.customer.id;
      const nextSubscriptionId =
        typeof session.subscription === 'string'
          ? session.subscription
          : session.subscription?.id;

      if (!nextSubscriptionId) {
        throw new Error('No subscription found for this session.');
      }

      const subscription = await stripe.subscriptions.retrieve(
        nextSubscriptionId,
        {
          expand: ['items.data.price.product']
        }
      );

      const plan = subscription.items.data[0]?.price;

      if (!plan) {
        throw new Error('No plan found for this subscription.');
      }

      productId = (plan.product as Stripe.Product).id;

      if (!productId) {
        throw new Error('No product ID found for this subscription.');
      }

      subscriptionId = nextSubscriptionId;
      planName = (plan.product as Stripe.Product).name;
      subscriptionStatus = subscription.status;

      if (!session.client_reference_id) {
        throw new Error("No user ID found in session's client_reference_id.");
      }

      userId = session.client_reference_id;
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(userId)))
      .limit(1);

    if (user.length === 0) {
      throw new Error('User not found in database.');
    }

    const userTeam = await db
      .select({
        teamId: teamMembers.teamId,
      })
      .from(teamMembers)
      .where(eq(teamMembers.userId, user[0].id))
      .limit(1);

    if (userTeam.length === 0) {
      throw new Error('User is not associated with any team.');
    }

    await db
      .update(teams)
      .set({
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
        stripeProductId: productId,
        planName,
        subscriptionStatus,
        updatedAt: new Date()
      })
      .where(eq(teams.id, userTeam[0].teamId));

    await setSession(user[0]);
    return NextResponse.redirect(
      new URL(localizePath(locale, '/dashboard'), request.url)
    );
  } catch (error) {
    console.error('Error handling successful checkout:', error);
    return NextResponse.redirect(
      new URL(localizePath(locale, '/pricing'), request.url)
    );
  }
}
