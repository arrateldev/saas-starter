'use client';

import { useActionState } from 'react';
import { Loader2, Lock, Trash2 } from 'lucide-react';
import { deleteAccount, updatePassword } from '@/app/(login)/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

type PasswordState = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  error?: string;
  success?: string;
};

type DeleteState = {
  password?: string;
  error?: string;
  success?: string;
};

export default function SecurityPage({
  locale = defaultLocale
}: {
  locale?: Locale;
}) {
  const t = getMessages(locale).dashboard;
  const auth = getMessages(locale).auth;
  const [passwordState, passwordAction, isPasswordPending] = useActionState<
    PasswordState,
    FormData
  >(updatePassword, {});
  const [deleteState, deleteAction, isDeletePending] = useActionState<
    DeleteState,
    FormData
  >(deleteAccount, {});

  return (
    <section className="space-y-6 px-1 pb-8">
      <div className="surface-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          {t.settings}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          {t.securitySettings}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {t.deleteWarning}
        </p>
      </div>

      <Card className="surface-card">
        <CardHeader>
          <CardTitle>{auth.password}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={passwordAction}>
            <input type="hidden" name="locale" value={locale} />
            <div>
              <Label htmlFor="current-password" className="mb-2">
                {t.currentPassword}
              </Label>
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                maxLength={100}
                defaultValue={passwordState.currentPassword}
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="mb-2">
                {t.newPassword}
              </Label>
              <Input
                id="new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={100}
                defaultValue={passwordState.newPassword}
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="mb-2">
                {t.confirmNewPassword}
              </Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                maxLength={100}
                defaultValue={passwordState.confirmPassword}
              />
            </div>
            {passwordState.error ? (
              <p className="text-sm text-red-500">{passwordState.error}</p>
            ) : null}
            {passwordState.success ? (
              <p className="text-sm text-green-500">{passwordState.success}</p>
            ) : null}
            <Button type="submit" disabled={isPasswordPending}>
              {isPasswordPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.updating}
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  {t.updatePassword}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="surface-card">
        <CardHeader>
          <CardTitle>{t.deleteAccount}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">{t.deleteWarning}</p>
          <form action={deleteAction} className="space-y-4">
            <input type="hidden" name="locale" value={locale} />
            <div>
              <Label htmlFor="delete-password" className="mb-2">
                {t.confirmPassword}
              </Label>
              <Input
                id="delete-password"
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={100}
                defaultValue={deleteState.password}
              />
            </div>
            {deleteState.error ? (
              <p className="text-sm text-red-500">{deleteState.error}</p>
            ) : null}
            <Button type="submit" variant="destructive" disabled={isDeletePending}>
              {isDeletePending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.deleting}
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t.deleteAccount}
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
