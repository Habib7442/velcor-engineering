import { company } from "@/lib/data/company";

export function ContactMap() {
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-6xl px-6 pb-16 sm:px-10 sm:pb-24">
        <div className="h-80 w-full overflow-hidden rounded-2xl border border-border sm:h-96">
          <iframe
            src={company.mapEmbedUrl}
            title={company.mapTitle}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
