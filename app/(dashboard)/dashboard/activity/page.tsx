import { AlertCircle, CheckCircle, Lock, LogOut, Mail, Settings, UserCog, UserMinus, UserPlus, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getActivityLogs } from '@/lib/db/queries';
import { ActivityType } from '@/lib/db/schema';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

const iconMap: Record<ActivityType, LucideIcon> = {
  [ActivityType.SIGN_UP]: UserPlus,
  [ActivityType.SIGN_IN]: UserCog,
  [ActivityType.SIGN_OUT]: LogOut,
  [ActivityType.UPDATE_PASSWORD]: Lock,
  [ActivityType.DELETE_ACCOUNT]: UserMinus,
  [ActivityType.UPDATE_ACCOUNT]: Settings,
  [ActivityType.CREATE_TEAM]: UserPlus,
  [ActivityType.REMOVE_TEAM_MEMBER]: UserMinus,
  [ActivityType.INVITE_TEAM_MEMBER]: Mail,
  [ActivityType.ACCEPT_INVITATION]: CheckCircle
};

function getRelativeTime(date: Date, locale: Locale) {
  const t = getMessages(locale).dashboard.relativeTime;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return t.justNow;
  if (diffInSeconds < 3600) {
    return t.minutesAgo.replace('{count}', String(Math.floor(diffInSeconds / 60)));
  }
  if (diffInSeconds < 86400) {
    return t.hoursAgo.replace('{count}', String(Math.floor(diffInSeconds / 3600)));
  }
  if (diffInSeconds < 604800) {
    return t.daysAgo.replace('{count}', String(Math.floor(diffInSeconds / 86400)));
  }

  return date.toLocaleDateString(locale);
}

function formatAction(action: ActivityType, locale: Locale): string {
  const t = getMessages(locale).dashboard.actions;

  switch (action) {
    case ActivityType.SIGN_UP:
      return t.signUp;
    case ActivityType.SIGN_IN:
      return t.signIn;
    case ActivityType.SIGN_OUT:
      return t.signOut;
    case ActivityType.UPDATE_PASSWORD:
      return t.updatePassword;
    case ActivityType.DELETE_ACCOUNT:
      return t.deleteAccount;
    case ActivityType.UPDATE_ACCOUNT:
      return t.updateAccount;
    case ActivityType.CREATE_TEAM:
      return t.createTeam;
    case ActivityType.REMOVE_TEAM_MEMBER:
      return t.removeTeamMember;
    case ActivityType.INVITE_TEAM_MEMBER:
      return t.inviteTeamMember;
    case ActivityType.ACCEPT_INVITATION:
      return t.acceptInvitation;
    default:
      return t.unknown;
  }
}

export default async function ActivityPage({
  locale = defaultLocale
}: {
  locale?: Locale;
}) {
  const logs = await getActivityLogs();
  const t = getMessages(locale).dashboard;

  return (
    <section className="space-y-6 px-1 pb-8">
      <div className="surface-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          {t.settings}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          {t.activityLog}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {t.recentActivity}
        </p>
      </div>

      <Card className="surface-card">
        <CardHeader>
          <CardTitle>{t.recentActivity}</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <ul className="space-y-4">
              {logs.map((log) => {
                const Icon = iconMap[log.action as ActivityType] || Settings;
                const formattedAction = formatAction(log.action as ActivityType, locale);

                return (
                  <li
                    key={log.id}
                    className="flex items-center gap-4 rounded-3xl border border-border/60 bg-background/70 p-4"
                  >
                    <div className="rounded-2xl bg-primary/10 p-2.5">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {formattedAction}
                        {log.ipAddress ? ` from IP ${log.ipAddress}` : ''}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getRelativeTime(new Date(log.timestamp), locale)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {t.noActivityYet}
              </h3>
              <p className="max-w-sm text-sm text-muted-foreground">
                {t.noActivityDescription}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
