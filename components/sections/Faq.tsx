"use client";

import { Accordion } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What's your engagement process like?",
    answer:
      "We start with a scoping call to understand the discipline and scale of work, follow with a written proposal covering deliverables and timeline, then move into design once terms are agreed. You get a single point of contact for the life of the project, not a rotating cast.",
  },
  {
    question: "Do you work on fixed-price or time-and-materials contracts?",
    answer:
      "Both, depending on scope. Well-defined deliverables typically run fixed-price; open-ended or evolving scopes run time-and-materials with regular progress billing. We agree the model upfront, in writing, before work starts.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends entirely on scope — a control system design might run a few weeks, a full plant engineering package can run several months. We give you a realistic schedule during scoping and flag risks to it as they come up, not at the deadline.",
  },
  {
    question: "What standards and codes do you design to?",
    answer:
      "We work to the codes your project actually requires — ASME, API, IEC, and site-specific standards depending on discipline and geography. Tell us your governing code set during scoping and we'll confirm we can deliver to it before you commit.",
  },
  {
    question: "What industries do you work with?",
    answer:
      "Water treatment, industrial automation, oil & gas, utilities, power, automotive, electronics, mining, and solar, among others — see the full list on our Our Expertise page. If your industry isn't listed, ask us directly; the disciplines usually transfer.",
  },
  {
    question: "How do I start a project with Velcor?",
    answer:
      "Send us a message through the contact form with a short description of what you need, or request a quote directly. We'll respond with clarifying questions or a scoping call proposal.",
  },
];

export function Faq() {
  return (
    <section className="bg-petrol-50">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-petrol uppercase">FAQ</span>
          <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
            Questions we hear before a project starts.
          </h2>
        </div>

        <Accordion.Root className="mt-10 flex max-w-3xl flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <Accordion.Item
              key={item.question}
              value={item.question}
              className="rounded-2xl border border-border bg-white px-6"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group/trigger flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-graphite">
                  {item.question}
                  <ChevronDown
                    className="size-5 shrink-0 text-petrol-700 transition-transform duration-200 group-data-[panel-open]/trigger:rotate-180"
                    aria-hidden="true"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="h-[var(--accordion-panel-height)] overflow-hidden text-sm leading-relaxed text-muted-foreground transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
                <p className="pb-5">{item.answer}</p>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
