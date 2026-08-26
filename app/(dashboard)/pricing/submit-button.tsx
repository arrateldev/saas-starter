'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

export function SubmitButton({
  locale = defaultLocale
}: {
  locale?: Locale;
}) {
  const { pending } = useFormStatus();
  const messages = getMessages(locale);

  return (
    <Button
      type="submit"
      disabled={pending}
      variant="outline"
      className="w-full"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          {messages.auth.loading}
        </>
      ) : (
        <>
          {messages.pricing.cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
