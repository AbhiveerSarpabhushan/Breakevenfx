// Ticker tape — muted, continuously scrolling forex/asset quotes.
// Pure CSS animation (see `animate-ticker` keyframes in tailwind.config.ts).
// The content array is duplicated so the -50% translate loops seamlessly.

type Tick = {
  pair: string;
  change: string;
  positive: boolean;
};

const ticks: Tick[] = [
  { pair: "EUR/USD", change: "+0.42%", positive: true },
  { pair: "NQ100", change: "+1.21%", positive: true },
  { pair: "GBP/JPY", change: "-0.18%", positive: false },
  { pair: "BTC/USD", change: "+2.31%", positive: true },
  { pair: "GOLD", change: "+0.87%", positive: true },
  { pair: "USD/JPY", change: "-0.33%", positive: false },
];

export default function TickerTape() {
  // Duplicate the set so translateX(-50%) lands exactly one full loop.
  const loop = [...ticks, ...ticks];

  return (
    <div
      className="w-full overflow-hidden border-y border-brand-border bg-brand-navy-2/70"
      aria-hidden="true"
    >
      <div className="flex w-max animate-ticker py-2.5">
        {loop.map((tick, i) => (
          <div
            key={`${tick.pair}-${i}`}
            className="flex items-center whitespace-nowrap font-mono text-[13px] tracking-tight"
          >
            <span className="px-5 text-brand-muted">
              {tick.pair}{" "}
              <span
                className={
                  tick.positive ? "text-brand-orange" : "text-brand-red"
                }
              >
                {tick.change}
              </span>
            </span>
            <span className="text-brand-border/80">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
