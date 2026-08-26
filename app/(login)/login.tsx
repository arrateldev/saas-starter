'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import { defaultLocale, localizePath, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { AppLogo } from '@/components/app-logo';

export function Login({
  mode = 'signin',
  locale = defaultLocale
}: {
  mode?: 'signin' | 'signup';
  locale?: Locale;
}) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const t = getMessages(locale).auth;
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <div className="page-aura-surface min-h-[100dvh] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100dvh-6rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="hidden lg:block">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-3 rounded-full border border-border/70 bg-background px-4 py-2 text-sm text-muted-foreground">
                <AppLogo className="h-6 w-6" />
                {mode === 'signin' ? t.signInTitle : t.signUpTitle}
              </div>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground">
                {mode === 'signin' ? t.signInTitle : t.signUpTitle}
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {mode === 'signin'
                  ? t.existingAccount
                  : t.newHere}
              </p>
            </div>
          </div>

          <div className="surface-panel w-full max-w-md justify-self-center p-7 sm:p-8">
            <div className="flex justify-center">
              <AppLogo className="h-12 w-12" priority />
            </div>
            <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-foreground">
              {mode === 'signin' ? t.signInTitle : t.signUpTitle}
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {mode === 'signin' ? t.newHere : t.existingAccount}
            </p>

            <form className="mt-8 space-y-5" action={formAction}>
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="redirect" value={redirect || ''} />
              <input type="hidden" name="priceId" value={priceId || ''} />
              <input type="hidden" name="inviteId" value={inviteId || ''} />
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-foreground">
                  {t.email}
                </Label>
                <div className="mt-2">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={state.email}
                    required
                    maxLength={50}
                    className="block h-12 w-full rounded-2xl border-border/80 bg-background px-4 text-foreground placeholder:text-muted-foreground"
                    placeholder={t.emailPlaceholder}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-foreground">
                  {t.password}
                </Label>
                <div className="mt-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete={
                      mode === 'signin' ? 'current-password' : 'new-password'
                    }
                    defaultValue={state.password}
                    required
                    minLength={8}
                    maxLength={100}
                    className="block h-12 w-full rounded-2xl border-border/80 bg-background px-4 text-foreground placeholder:text-muted-foreground"
                    placeholder={t.passwordPlaceholder}
                  />
                </div>
              </div>

              {state?.error && (
                <div className="rounded-2xl border border-destructive/20 bg-destructive/8 px-4 py-3 text-sm text-red-600">
                  {state.error}
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={pending}>
                {pending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.loading}
                  </>
                ) : mode === 'signin' ? (
                  t.signIn
                ) : (
                  t.signUp
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/70" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-3 text-muted-foreground">
                    {mode === 'signin' ? t.newHere : t.existingAccount}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild variant="outline" className="w-full" size="lg">
                  <Link
                    href={`${localizePath(
                      locale,
                      mode === 'signin' ? '/sign-up' : '/sign-in'
                    )}${redirect ? `?redirect=${redirect}` : ''}${
                      priceId ? `&priceId=${priceId}` : ''
                    }`}
                  >
                    {mode === 'signin' ? t.createAccount : t.signInExisting}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
