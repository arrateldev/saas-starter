import Image from 'next/image';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';

export function AppLogo({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/favicon.ico"
      alt={`${siteConfig.product.name} logo`}
      width={64}
      height={64}
      priority={priority}
      className={cn('object-contain', className)}
    />
  );
}
