import { Quote } from "lucide-react";

export function OurPromise() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:px-10 sm:py-20">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-blue-100">
          <Quote className="size-6 text-blue-800" aria-hidden="true" />
        </div>
        <span className="mt-5 block text-xs font-medium tracking-wide text-blue-600 uppercase">Our Promise</span>
        <p className="font-heading mt-4 text-center text-2xl leading-snug font-semibold text-blue-900 sm:text-3xl">
          We commit to calculations you can audit, schedules we hold ourselves to, and drawings issued for
          construction — not just for review.
        </p>
      </div>
    </section>
  );
}
