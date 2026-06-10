"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Story", href: "/#story" },
  { label: "Results", href: "/#results" },
  { label: "Apply", href: "/#apply" },
];

function Logo() {
  return (
    <Link
      href="/#home"
      className="font-display text-xl font-bold tracking-tight text-brand-white"
    >
      BreakevenFX
      <span className="text-brand-orange">.</span>
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-border bg-brand-navy/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo />

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-brand-muted transition-colors hover:text-brand-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/#apply"
            className="rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-semibold text-brand-white transition-all hover:shadow-orange-soft hover:brightness-110"
          >
            Apply Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-brand-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-brand-border bg-brand-navy/95 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col px-5 py-3 sm:px-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-brand-muted transition-colors hover:text-brand-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pb-2 pt-3">
              <Link
                href="/#apply"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-brand-orange px-5 py-3 text-center text-sm font-semibold text-brand-white transition-all hover:brightness-110"
              >
                Apply Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
