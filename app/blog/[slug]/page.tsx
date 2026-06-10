import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | BreakevenFX",
    };
  }

  return {
    title: `${post.title} | BreakevenFX`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="bg-brand-navy">
        <article className="mx-auto max-w-[720px] px-5 py-16 sm:px-8 sm:py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-muted transition-colors hover:text-brand-white"
          >
            <ArrowLeft size={16} />
            Back to all posts
          </Link>

          <header className="mt-8">
            <h1 className="font-display text-3xl font-bold leading-tight text-brand-white sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <time className="font-mono text-sm text-brand-muted">
                {post.date}
              </time>
              <span className="text-brand-border">•</span>
              <span className="rounded-full bg-brand-orange/10 px-3 py-1 font-mono text-xs font-medium text-brand-orange">
                {post.category}
              </span>
            </div>
          </header>

          <div className="mt-10 space-y-6">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-[17px] leading-[1.8] text-brand-white/85"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* End-of-post CTA */}
          <div className="mt-14 rounded-xl border border-brand-border border-l-4 border-l-brand-orange bg-brand-navy-2 p-6 sm:p-8">
            <p className="font-display text-xl font-semibold text-brand-white">
              Want to trade with a real edge?
            </p>
            <Link
              href="/#apply"
              className="mt-3 inline-flex items-center gap-1.5 text-base font-semibold text-brand-orange transition-colors hover:text-brand-green-light"
            >
              Apply to BreakevenFX
              <ArrowRight size={18} />
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
