type Testimonial = {
  quote: string;
  name: string;
  country: string;
  flag: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Before BreakevenFX I was revenge trading every loss into a bigger loss. Two weeks in, that stopped completely. Abhiveer showed me why my psychology was the actual problem, not my strategy.",
    name: "James R.",
    country: "United Kingdom",
    flag: "🇬🇧",
  },
  {
    quote:
      "I failed two FTMO challenges before joining. After going through the program I passed my third attempt comfortably. The risk management framework alone was worth it.",
    name: "Priya M.",
    country: "India",
    flag: "🇮🇳",
  },
  {
    quote:
      "I was watching YouTube videos for two years and going nowhere. This program gave me an actual structured approach for the first time. I finally understand what confluence means in practice.",
    name: "Carlos D.",
    country: "Mexico",
    flag: "🇲🇽",
  },
  {
    quote:
      "What I appreciate most is that Abhiveer doesn't sugarcoat it. He told me my entries were early and my position sizing was reckless — and he was right. Honest feedback you can actually use.",
    name: "Aisha T.",
    country: "Nigeria",
    flag: "🇳🇬",
  },
  {
    quote:
      "The live sessions are the real value. Watching someone explain their reasoning on a live chart in real time is completely different from a recorded course.",
    name: "Daniel K.",
    country: "Germany",
    flag: "🇩🇪",
  },
  {
    quote:
      "I was skeptical because I'd been burned by signal sellers before. This is genuinely different. It's education, not dependency.",
    name: "Sofia L.",
    country: "Brazil",
    flag: "🇧🇷",
  },
];

export default function Testimonials() {
  return (
    <section id="results" className="bg-brand-navy py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
            Real Students, Real Words
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-white sm:text-4xl">
            What Students Are Saying
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-xl border border-brand-border border-t-2 border-t-brand-orange bg-brand-navy-2 p-6 transition-all duration-300 hover:shadow-orange-subtle sm:p-7"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-brand-orange"
              >
                &ldquo;
              </span>
              <blockquote className="-mt-2 text-[15px] leading-relaxed text-brand-white/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 border-t border-brand-border pt-4">
                <div className="font-semibold text-brand-white">{t.name}</div>
                <div className="mt-0.5 text-sm text-brand-muted">
                  <span aria-hidden="true">{t.flag}</span> {t.country}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
