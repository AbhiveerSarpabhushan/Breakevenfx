import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Trading Insights | BreakevenFX",
  description:
    "Strategy breakdowns, mindset, and lessons from the desk of Abhiveer Sarpabhushan, founder of BreakevenFX.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="bg-brand-navy">
        <section className="border-b border-brand-border bg-brand-navy-2">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
              From the Desk
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-brand-white sm:text-5xl">
              Trading Insights
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
              Strategy breakdowns, mindset, and lessons from the desk of
              Abhiveer Sarpabhushan.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-xl border border-brand-border bg-brand-navy-2 p-6 transition-all duration-300 hover:border-brand-green-light/50 hover:shadow-orange-subtle"
              >
                <span className="inline-flex w-fit rounded-full bg-brand-orange/10 px-3 py-1 font-mono text-xs font-medium text-brand-orange">
                  {post.category}
                </span>
                <h2 className="mt-4 font-display text-xl font-bold leading-snug text-brand-white">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors group-hover:text-brand-orange"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-muted">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-brand-border pt-4">
                  <time className="font-mono text-xs text-brand-muted">
                    {post.date}
                  </time>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange transition-colors hover:text-brand-green-light"
                  >
                    Read More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
