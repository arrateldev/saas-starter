'use server';

import { redirect } from 'next/navigation';
import {
  createCheckoutSession,
  createCustomerPortalSession,
  isMockStripeEnabled
} from './stripe';
import { withTeam } from '@/lib/auth/middleware';
import { updateTeamSubscription } from '@/lib/db/queries';
import { getLocaleFromFormData, localizePath } from '@/lib/i18n/config';

export const checkoutAction = withTeam(async (formData, team) => {
  const priceId = formData.get('priceId') as string;
  await createCheckoutSession({
    team,
    priceId,
    locale: getLocaleFromFormData(formData)
  });
});

export const customerPortalAction = withTeam(async (formData, team) => {
  const portalSession = await createCustomerPortalSession(
    team,
    getLocaleFromFormData(formData)
  );
  redirect(portalSession.url);
});

export const updateMockSubscriptionAction = withTeam(async (formData, team) => {
  const locale = getLocaleFromFormData(formData);

  if (!isMockStripeEnabled()) {
    redirect(localizePath(locale, '/dashboard'));
  }

  const planName = formData.get('planName');
  const productId = formData.get('productId');
  const subscriptionStatus = formData.get('subscriptionStatus');

  const nextPlanName = typeof planName === 'string' ? planName : null;
  const nextProductId = typeof productId === 'string' ? productId : null;
  const nextStatus =
    typeof subscriptionStatus === 'string' ? subscriptionStatus : 'inactive';

  await updateTeamSubscription(team.id, {
    stripeSubscriptionId:
      nextStatus === 'active' || nextStatus === 'trialing'
        ? `mock_sub_${nextProductId ?? 'free'}`
        : null,
    stripeProductId: nextProductId,
    planName: nextPlanName,
    subscriptionStatus: nextStatus
  });

  redirect(localizePath(locale, '/dashboard/billing'));
});
