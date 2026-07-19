import { PRODUCT_DESIGN_ITEMS } from "@/lib/data/product-design";

export function ProductDesignSection() {
  return (
    <section id="product-design" className="scroll-mt-24 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10 sm:py-16">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-wide text-petrol uppercase">Product Design</span>
          <h2 className="font-heading mt-3 text-3xl leading-[1.15] font-semibold text-graphite sm:text-4xl">
            The machine, the controls, the automation behind it.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_DESIGN_ITEMS.map((item) => (
            <div key={item.name} className="rounded-2xl border border-border bg-white p-6">
              <div className="flex size-10 items-center justify-center rounded-full bg-amber-100">
                <item.icon className="size-5 text-petrol-700" aria-hidden="true" />
              </div>
              <h3 className="font-heading mt-4 text-lg font-semibold text-graphite">{item.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
