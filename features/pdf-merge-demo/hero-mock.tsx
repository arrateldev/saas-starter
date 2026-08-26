export function PdfMergeHeroMock() {
  return (
    <div className="surface-card flex h-[172px] w-full items-center overflow-hidden p-3">
      <div className="flex h-[146px] w-full flex-col rounded-[20px] border border-border/70 bg-background p-2.5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="h-2 w-20 rounded-full bg-muted-foreground/18" />
          <div className="h-4 w-11 rounded-full bg-emerald-100" />
        </div>

        <div className="mt-2.5 grid flex-1 grid-cols-[1.1fr_0.9fr] gap-2.5">
          <div className="relative h-[92px] self-center">
            <div className="animate-mock-file-top absolute inset-x-1 top-0 z-10 rounded-lg border border-border/70 bg-muted/40 px-2 py-1 shadow-[0_10px_24px_-18px_rgba(15,23,42,0.35)]">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-md bg-background/80" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="h-1.5 w-11 rounded-full bg-foreground/12" />
                  <div className="h-1 w-14 rounded-full bg-foreground/8" />
                </div>
              </div>
            </div>
            <div className="animate-mock-file-bottom absolute inset-x-1 top-[30px] rounded-lg border border-border/70 bg-muted/40 px-2 py-1">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-md bg-background/80" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="h-1.5 w-9 rounded-full bg-foreground/12" />
                  <div className="h-1 w-12 rounded-full bg-foreground/8" />
                </div>
              </div>
            </div>
            <div className="absolute inset-x-1 top-[60px] rounded-lg border border-dashed border-primary/35 bg-primary/5 px-2 py-1">
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-4 rounded-md bg-primary/12" />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="h-1.5 w-12 rounded-full bg-primary/25" />
                  <div className="h-1 w-14 rounded-full bg-primary/15" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/30 p-2.5">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="h-1.5 w-10 rounded-full bg-muted-foreground/18" />
              <div className="h-1.5 w-8 rounded-full bg-muted-foreground/14" />
            </div>
            <div className="mt-2.5 space-y-2">
              <div className="h-1.5 rounded-full bg-background">
                <div className="animate-mock-progress h-full w-2/3 rounded-full bg-primary" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-background px-2 py-1.5">
                  <div className="h-1.5 w-8 rounded-full bg-foreground/12" />
                </div>
                <div className="rounded-lg bg-background px-2 py-1.5">
                  <div className="h-1.5 w-9 rounded-full bg-foreground/12" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
