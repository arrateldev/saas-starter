'use client';

import { Suspense, useActionState } from 'react';
import useSWR from 'swr';
import { Loader2 } from 'lucide-react';
import { updateAccount } from '@/app/(login)/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/lib/db/schema';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const swrOptions = {
  revalidateOnMount: false,
  revalidateIfStale: false
};

type ActionState = {
  name?: string;
  error?: string;
  success?: string;
};

type AccountFormProps = {
  state: ActionState;
  nameValue?: string;
  emailValue?: string;
  locale: Locale;
};

function AccountForm({
  state,
  nameValue = '',
  emailValue = '',
  locale
}: AccountFormProps) {
  const t = getMessages(locale).dashboard;

  return (
    <>
      <div>
        <Label htmlFor="name" className="mb-2">
          {t.name}
        </Label>
        <Input
          id="name"
          name="name"
          placeholder={t.namePlaceholder}
          defaultValue={state.name || nameValue}
          required
        />
      </div>
      <div>
        <Label htmlFor="email" className="mb-2">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          defaultValue={emailValue}
          required
        />
      </div>
    </>
  );
}

function AccountFormWithData({
  state,
  locale
}: {
  state: ActionState;
  locale: Locale;
}) {
  const { data: user } = useSWR<User>('/api/user', fetcher, swrOptions);

  return (
    <AccountForm
      state={state}
      nameValue={user?.name ?? ''}
      emailValue={user?.email ?? ''}
      locale={locale}
    />
  );
}

export default function GeneralPage({
  locale = defaultLocale
}: {
  locale?: Locale;
}) {
  const t = getMessages(locale).dashboard;
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateAccount,
    {}
  );

  return (
    <section className="space-y-6 px-1 pb-8">
      <div className="surface-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          {t.settings}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          {t.generalSettings}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {t.accountInformation}
        </p>
      </div>

      <Card className="surface-card">
        <CardHeader>
          <CardTitle>{t.accountInformation}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={formAction}>
            <input type="hidden" name="locale" value={locale} />
            <Suspense fallback={<AccountForm state={state} locale={locale} />}>
              <AccountFormWithData state={state} locale={locale} />
            </Suspense>
            {state.error ? (
              <p className="text-sm text-red-500">{state.error}</p>
            ) : null}
            {state.success ? (
              <p className="text-sm text-green-500">{state.success}</p>
            ) : null}
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.saving}
                </>
              ) : (
                t.saveChanges
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
