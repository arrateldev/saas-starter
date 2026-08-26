import type { ReactNode } from 'react';

export function LegalPage({
  eyebrow,
  title,
  intro,
  children
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="page-aura-surface bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="surface-panel page-aura-card p-8 sm:p-10">
          <p className="text-primary text-sm font-medium uppercase tracking-[0.22em]">
            {eyebrow}
          </p>
          <h1 className="text-foreground mt-4 text-4xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-7">
            {intro}
          </p>
          <div className="text-foreground mt-10 space-y-8 text-sm leading-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-foreground text-lg font-semibold">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
