import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Story", href: "/#story" },
  { label: "Results", href: "/#results" },
  { label: "Apply", href: "/#apply" },
];

// Inline brand SVGs (kept local so we don't depend on a brand-icon set that
// shifts between lucide-react versions).
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.036A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-footer">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="font-display text-xl font-bold text-brand-white">
              BreakevenFX
              <span className="text-brand-orange">.</span>
            </span>
            <p className="mt-3 text-sm text-brand-muted">
              Built by a trader, for traders.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/abhiveersarpabhushan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="BreakevenFX on Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-navy-2 text-brand-muted transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <InstagramIcon />
              </a>
              {/* Add Twitter/X URL when available */}
              <a
                href="#"
                aria-label="BreakevenFX on X (Twitter)"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-navy-2 text-brand-muted transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <XIcon />
              </a>
              {/* Add Discord URL when available */}
              <a
                href="#"
                aria-label="BreakevenFX on Discord"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-brand-navy-2 text-brand-muted transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                <DiscordIcon />
              </a>
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-muted transition-colors hover:text-brand-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-brand-muted transition-colors hover:text-brand-white"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-brand-border pt-8">
          <p className="text-sm text-brand-muted">
            © 2025 BreakevenFX. All rights reserved.
          </p>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-brand-muted/80">
            Trading involves significant risk of loss. Past results do not
            guarantee future performance. BreakevenFX is an educational
            mentorship program and does not provide financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
