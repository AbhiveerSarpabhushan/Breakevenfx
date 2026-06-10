import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Beat = {
  year?: string;
  title: string;
  text: string;
};

const beats: Beat[] = [
  {
    year: "2023",
    title: "The Start",
    text: "I found trading in 2023. I was ambitious and genuinely curious — I figured if I put in enough hours, it would click fast. Almost everyone who starts out thinks the exact same thing.",
  },
  {
    title: "The Reality",
    text: "It didn't click. I blew through multiple funded accounts. Real money, real losses, and a level of frustration I wasn't ready for. More than once I seriously thought about walking away for good.",
  },
  {
    title: "The Grind",
    text: "Instead of quitting, I went deeper. I backtested obsessively, tore my approach apart, and rebuilt my mindset from the ground up. No shortcuts and no signal groups — just screen time and brutally honest reviews of my own mistakes.",
  },
  {
    title: "The Breakthrough",
    text: "Consistency didn't show up overnight, and it didn't come from a course or a magic indicator. It came from doing the work until I had a real edge — one I actually trusted under pressure.",
  },
  {
    year: "2025",
    title: "BreakevenFX",
    text: "In 2025 I built the program I wish I'd had when I started. BreakevenFX exists to give struggling traders a real path forward — the one I had to find the hard way, alone.",
  },
  {
    year: "2026",
    title: "The Growth",
    text: "By 2026, more than 200 students across 10+ countries had come through the program. Different backgrounds, same fight — and finally some structure to win it.",
  },
];

const PULL_QUOTE =
  "I failed more funded accounts than I want to admit. But I never stopped. That stubbornness is what built this program.";

// Index after which the pull quote is inserted (between beats 3 and 4).
const QUOTE_AFTER_INDEX = 2;

function TimelineBeat({ beat, index }: { beat: Beat; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="relative">
      {/* Dot on the timeline — left rail on mobile, centered on desktop */}
      <span className="absolute left-[7px] top-1.5 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-brand-orange ring-4 ring-brand-navy-2 md:left-1/2" />

      <div className="md:grid md:grid-cols-2">
        <div
          className={[
            "pl-9 md:pl-0",
            isLeft
              ? "md:col-start-1 md:pr-12 md:text-right"
              : "md:col-start-2 md:pl-12 md:text-left",
          ].join(" ")}
        >
          {beat.year && (
            <span className="font-mono text-sm font-medium text-brand-orange">
              {beat.year}
            </span>
          )}
          <h3 className="mt-1 font-display text-xl font-bold text-brand-white sm:text-2xl">
            {beat.title}
          </h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-brand-muted">
            {beat.text}
          </p>
        </div>
      </div>
    </div>
  );
}

function PullQuote() {
  return (
    <blockquote className="relative mx-auto max-w-3xl border-l-4 border-brand-orange py-2 pl-6 md:pl-8">
      <p className="font-display text-2xl font-medium italic leading-snug text-brand-white sm:text-[1.9rem]">
        &ldquo;{PULL_QUOTE}&rdquo;
      </p>
      <cite className="mt-4 block font-sans text-sm not-italic text-brand-muted">
        — Abhiveer Sarpabhushan
      </cite>
    </blockquote>
  );
}

export default function FounderStory() {
  return (
    <section id="story" className="bg-brand-navy-2 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
            From Blown Accounts to Consistency
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-white sm:text-4xl">
            The Founder&rsquo;s Story
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Vertical line: left rail on mobile, centered on desktop */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-brand-border md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-14">
            {beats.map((beat, index) => (
              <div key={beat.title}>
                <TimelineBeat beat={beat} index={index} />
                {index === QUOTE_AFTER_INDEX && (
                  <div className="relative my-14 pl-9 md:pl-0">
                    <PullQuote />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Soft CTA */}
        <p className="mt-16 text-center text-lg text-brand-muted">
          If you&rsquo;re where I was, I built this for you.{" "}
          <Link
            href="/#apply"
            className="inline-flex items-center gap-1 font-semibold text-brand-orange transition-colors hover:text-brand-green-light"
          >
            Apply Now
            <ArrowRight size={18} className="mt-0.5" />
          </Link>
        </p>
      </div>
    </section>
  );
}
