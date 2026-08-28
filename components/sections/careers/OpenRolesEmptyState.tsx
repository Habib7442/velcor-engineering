import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export function OpenRolesEmptyState() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-blue-600 uppercase">Open Roles</span>
          <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-blue-900 sm:text-4xl">
            No open positions right now.
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-border bg-blue-50 p-8 sm:p-10">
          <div className="flex size-12 items-center justify-center rounded-full bg-blue-100">
            <Inbox className="size-6 text-blue-800" aria-hidden="true" />
          </div>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            We&apos;re not actively hiring for a specific role at the moment, but we&apos;re always interested in
            hearing from engineers who work across disciplines. Send us your resume and we&apos;ll reach out when
            something fits.
          </p>
          <Button nativeButton={false} render={<a href="#apply" />}>
            Send Us Your Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
