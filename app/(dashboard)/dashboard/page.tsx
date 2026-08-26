'use client';

import { Suspense, useActionState } from 'react';
import useSWR from 'swr';
import { Loader2, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { customerPortalAction } from '@/lib/payments/actions';
import { TeamDataWithMembers, User } from '@/lib/db/schema';
import { inviteTeamMember, removeTeamMember } from '@/app/(login)/actions';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

type ActionState = {
  error?: string;
  success?: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const swrOptions = {
  revalidateOnMount: false,
  revalidateIfStale: false
};

function SectionHeader({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="surface-panel p-6 sm:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function SubscriptionSkeleton() {
  return (
    <Card className="surface-card mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Team Subscription</CardTitle>
      </CardHeader>
    </Card>
  );
}

function ManageSubscription({ locale }: { locale: Locale }) {
  const { data: teamData } = useSWR<TeamDataWithMembers>(
    '/api/team',
    fetcher,
    swrOptions
  );
  const t = getMessages(locale).dashboard;

  return (
    <Card className="surface-card mb-8">
      <CardHeader>
        <CardTitle>{t.teamSubscription}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium text-foreground">
              {t.currentPlan}: {teamData?.planName || 'Free'}
            </p>
            <p className="text-sm text-muted-foreground">
              {teamData?.subscriptionStatus === 'active'
                ? t.billedMonthly
                : teamData?.subscriptionStatus === 'trialing'
                  ? t.trialPeriod
                  : t.noActiveSubscription}
            </p>
          </div>
          <form action={customerPortalAction}>
            <input type="hidden" name="locale" value={locale} />
            <Button type="submit" variant="outline">
              {t.manageSubscription}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamMembersSkeleton() {
  return (
    <Card className="surface-card mb-8 h-[140px]">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-1 animate-pulse space-y-4">
          <div className="flex items-center space-x-4">
            <div className="size-8 rounded-full bg-gray-200" />
            <div className="space-y-2">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-3 w-14 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TeamMembers({ locale }: { locale: Locale }) {
  const { data: teamData } = useSWR<TeamDataWithMembers>(
    '/api/team',
    fetcher,
    swrOptions
  );
  const t = getMessages(locale).dashboard;
  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, {});

  const getUserDisplayName = (user: Pick<User, 'id' | 'name' | 'email'>) =>
    user.name || user.email || 'Unknown User';

  if (!teamData?.teamMembers?.length) {
    return (
      <Card className="surface-card mb-8">
        <CardHeader>
          <CardTitle>{t.teamMembers}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t.noTeamMembers}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="surface-card mb-8">
      <CardHeader>
        <CardTitle>{t.teamMembers}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {teamData.teamMembers.map((member, index) => (
            <li
              key={member.id}
              className="flex items-center justify-between rounded-3xl border border-border/60 bg-background/70 px-4 py-3"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {getUserDisplayName(member.user)
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {getUserDisplayName(member.user)}
                  </p>
                  <p className="text-sm capitalize text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </div>
              {index > 1 ? (
                <form action={removeAction}>
                  <input type="hidden" name="memberId" value={member.id} />
                  <input type="hidden" name="locale" value={locale} />
                  <Button
                    type="submit"
                    variant="outline"
                    size="sm"
                    disabled={isRemovePending}
                  >
                    {isRemovePending ? t.removing : t.remove}
                  </Button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
        {removeState?.error ? (
          <p className="mt-4 text-sm text-red-500">{removeState.error}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

function InviteTeamMemberSkeleton() {
  return (
    <Card className="surface-card h-[260px]">
      <CardHeader>
        <CardTitle>Invite Team Member</CardTitle>
      </CardHeader>
    </Card>
  );
}

function InviteTeamMember({ locale }: { locale: Locale }) {
  const { data: user } = useSWR<User>('/api/user', fetcher, swrOptions);
  const isOwner = user?.role === 'owner';
  const t = getMessages(locale).dashboard;
  const [inviteState, inviteAction, isInvitePending] = useActionState<
    ActionState,
    FormData
  >(inviteTeamMember, {});

  return (
    <Card className="surface-card">
      <CardHeader>
        <CardTitle>{t.inviteTeamMember}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={inviteAction} className="space-y-4">
          <input type="hidden" name="locale" value={locale} />
          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
              disabled={!isOwner}
            />
          </div>
          <div>
            <Label>{t.role}</Label>
            <RadioGroup
              defaultValue="member"
              name="role"
              className="mt-2 flex space-x-4"
              disabled={!isOwner}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="member" id="member" />
                <Label htmlFor="member">{t.member}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="owner" id="owner" />
                <Label htmlFor="owner">{t.owner}</Label>
              </div>
            </RadioGroup>
          </div>
          {inviteState?.error ? (
            <p className="text-sm text-red-500">{inviteState.error}</p>
          ) : null}
          {inviteState?.success ? (
            <p className="text-sm text-green-500">{inviteState.success}</p>
          ) : null}
          <Button
            type="submit"
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.inviting}
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                {t.inviteMember}
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner ? (
        <CardFooter>
          <p className="text-sm text-muted-foreground">{t.ownerOnly}</p>
        </CardFooter>
      ) : null}
    </Card>
  );
}

export default function SettingsPage({
  locale = defaultLocale
}: {
  locale?: Locale;
}) {
  const t = getMessages(locale).dashboard;

  return (
    <section className="space-y-6 px-1 pb-8">
      <SectionHeader
        eyebrow={t.settings}
        title={t.teamSettings}
        description={t.teamMembers}
      />
      <Suspense fallback={<SubscriptionSkeleton />}>
        <ManageSubscription locale={locale} />
      </Suspense>
      <Suspense fallback={<TeamMembersSkeleton />}>
        <TeamMembers locale={locale} />
      </Suspense>
      <Suspense fallback={<InviteTeamMemberSkeleton />}>
        <InviteTeamMember locale={locale} />
      </Suspense>
    </section>
  );
}
