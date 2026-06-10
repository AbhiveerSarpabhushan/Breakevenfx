import Link from "next/link";
import TickerTape from "./TickerTape";

const stats = [
  { value: "200+", label: "Students" },
  { value: "10+", label: "Countries" },
  { value: "2025", label: "Founded" },
  { value: "Real Trades.", label: "Real Results." },
];

// Divider rules: clean single-row dividers on desktop, a centered divider for
// the 2x2 grid on mobile (see the prompt's responsive stats-bar requirement).
const dividerClasses = [
  "",
  "border-l border-brand-border",
  "md:border-l md:border-brand-border",
  "border-l border-brand-border",
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-brand-navy">
      <TickerTape />

      {/* Subtle grid pattern + wash */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.5]" />
      <div className="pointer-events-none absolute inset-0 section-wash" />

      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-20 text-center sm:px-8 sm:pt-28">
        <span className="inline-block rounded-full border border-brand-border bg-brand-navy-2 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-brand-muted">
          Private Day Trading Mentorship
        </span>

        <h1 className="mx-auto mt-7 max-w-3xl font-display text-4xl font-bold leading-[1.1] text-brand-white sm:text-5xl md:text-6xl">
          Stop Losing. Start Trading Like You Mean It.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
          BreakevenFX is a private day trading mentorship for serious traders
          who are tired of blowing accounts and want a proven system.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/#apply"
            className="w-full rounded-lg bg-brand-orange px-7 py-3.5 text-sm font-semibold text-brand-white transition-all hover:shadow-orange-soft hover:brightness-110 sm:w-auto"
          >
            Apply for Mentorship
          </Link>
          <Link
            href="/#results"
            className="w-full rounded-lg border border-brand-orange/70 bg-brand-navy-2 px-7 py-3.5 text-sm font-semibold text-brand-white transition-all hover:border-brand-orange hover:bg-brand-navy-3 sm:w-auto"
          >
            See Student Results
          </Link>
        </div>

        {/* Stats bar */}
        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-4 ${dividerClasses[i]}`}
            >
              <dt className="font-mono text-2xl font-medium text-brand-orange sm:text-[1.7rem]">
                {stat.value}
              </dt>
              <dd className="mt-1.5 text-sm text-brand-muted">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
