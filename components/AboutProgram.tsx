import { Video, Target, Users, ClipboardCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Video,
    title: "Live Mentorship",
    description:
      "Direct access to Abhiveer through live sessions and mentorship calls. Ask questions about real trades in real time, not canned video lessons.",
  },
  {
    icon: Target,
    title: "A Proven System",
    description:
      "The exact framework Abhiveer used to go from blowing funded accounts to consistent profitability. Built from real screen time, not theory.",
  },
  {
    icon: Users,
    title: "Private Community",
    description:
      "A focused community of traders who are serious about improving. No noise, no hype — just people doing the work.",
  },
  {
    icon: ClipboardCheck,
    title: "Personalized Feedback",
    description:
      "Your trades reviewed, your mistakes caught. Abhiveer looks at your actual charts, not generic advice.",
  },
];

export default function AboutProgram() {
  return (
    <section id="about" className="bg-brand-navy py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
            The Program
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-white sm:text-4xl">
            What Is BreakevenFX?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-muted">
            Not a course you watch once and forget. A mentorship built around
            real screen time, honest feedback, and a system that actually holds
            up when money is on the line.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className="group rounded-xl border border-brand-border border-l-[3px] border-l-brand-green bg-brand-navy-2 p-7 transition-all duration-300 hover:border-brand-green-light/50 hover:border-l-brand-green-light hover:shadow-orange-subtle sm:p-8"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-brand-border bg-brand-navy-3 text-brand-orange">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold text-brand-white">
                  {feature.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-brand-muted">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
