import Link from "next/link";
import { CATEGORIES, TOTAL_TOOLS, AVAILABLE_TOOLS, toolHref, getToolIcon } from "@/lib/catalog";
import { Icon } from "@/components/ui/Icon";
import { getLocale } from "@/i18n/locale";
import { getContent, localizeCategory, localizeTool } from "@/i18n/content";

const QUICK_LINKS = ["loan-calculator", "bmi-calculator", "percentage-calculator", "mortgage-calculator"];

export async function HomeHero() {
  const locale = await getLocale();
  const content = await getContent(locale);
  const popular = QUICK_LINKS
    .map((slug) => AVAILABLE_TOOLS.find((tool) => tool.slug === slug))
    .filter((tool) => tool !== undefined);

  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-[linear-gradient(115deg,#edf7f1_0%,#fff_54%,#fff1e8_100%)] dark:bg-[linear-gradient(115deg,#132821_0%,var(--background)_54%,#30231d_100%)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(15,91,70,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,91,70,0.045)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 border-s-2 border-[#e56b45] ps-3 text-xs font-bold uppercase text-[#a74428] dark:text-[#ffad8c]">
            <Icon name="Calculator" className="h-4 w-4" />
            Free calculators for everyday decisions
          </p>

          <h1 className="hero-lcp mt-5 max-w-3xl text-4xl font-extrabold leading-[1.06] text-[#123d32] dark:text-[#ecf8f1] sm:text-6xl">
            Calculator<br className="hidden sm:block" /> Bazaar<span className="text-[#e56b45]">.</span>
          </h1>
          <p className="mt-4 max-w-xl text-xl font-bold leading-snug text-foreground sm:text-2xl">
            A clearer number for every decision.
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            Work out payments, percentages, health goals, and project materials with practical calculators that get straight to the answer.
          </p>

          <form
            action="/tools"
            method="get"
            className="input-glow mt-7 flex flex-col gap-2 rounded-lg border border-border bg-surface p-2 shadow-lg shadow-[#123d32]/10 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-2">
              <Icon name="Search" className="h-5 w-5 shrink-0 text-brand" />
              <input
                name="q"
                type="search"
                placeholder={`Search ${TOTAL_TOOLS}+ calculators...`}
                aria-label="Search calculators"
                className="h-12 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted"
              />
            </div>
            <button
              type="submit"
              className="h-12 rounded-md bg-brand px-6 text-sm font-bold text-brand-fg transition-colors hover:bg-brand-2"
            >
              Find a calculator
            </button>
          </form>

          <p className="mt-4 text-xs font-semibold text-muted">{TOTAL_TOOLS} useful calculators. No account needed.</p>
        </div>

        <div className="mx-auto w-full max-w-lg overflow-hidden rounded-lg bg-[#123d32] text-white shadow-xl shadow-[#123d32]/15">
          <div className="flex items-end justify-between gap-3 border-b border-white/15 px-5 py-5 sm:px-6">
            <div>
              <p className="text-xs font-bold uppercase text-[#a9d8bd]">The quick list</p>
              <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">Popular calculators</h2>
            </div>
            <span className="mb-0.5 text-sm font-semibold text-white/65">01 — 04</span>
          </div>

          <div className="px-5 sm:px-6">
            {popular.map((tool, index) => {
              const label = localizeTool(content, tool);
              const category = CATEGORIES.find((item) => item.slug === tool.category);
              const categoryLabel = category
                ? localizeCategory(content, category.slug, {
                    name: category.name,
                    description: category.description,
                    tagline: category.tagline,
                  }).name
                : "Calculator";
              return (
                <Link
                  key={tool.slug}
                  href={toolHref(tool)}
                  prefetch={false}
                  className="group flex items-center gap-4 border-b border-white/15 py-4 last:border-0"
                >
                  <span className="w-7 shrink-0 font-mono text-sm text-[#f3a184]">0{index + 1}</span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/10 text-[#bfe6cd]">
                    <Icon name={getToolIcon(tool)} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{label.name}</span>
                    <span className="mt-0.5 block truncate text-xs text-white/65">{categoryLabel}</span>
                  </span>
                  <Icon name="ArrowUpRight" className="h-4 w-4 shrink-0 text-white/55 transition-colors group-hover:text-[#f3a184]" />
                </Link>
              );
            })}
          </div>

          <Link href="/tools" className="flex items-center justify-between gap-3 bg-white/8 px-5 py-4 text-sm font-bold transition-colors hover:bg-white/12 sm:px-6">
            <span>Browse all {TOTAL_TOOLS} calculators</span>
            <Icon name="ArrowRight" className="h-4 w-4 shrink-0 text-[#f3a184]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
