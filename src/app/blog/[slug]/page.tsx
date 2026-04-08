'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/i18n';
import { Button } from '@/components';

export default function BlogPostPage() {
  const { dictionary: d } = useLanguage();
  const params = useParams();
  const slug = params.slug as string;

  const post = d.blog.posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="py-20 md:py-32 bg-bg-warm">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brown-secondary mb-8">{d.blog.postNotFound}</p>
          <Button href="/blog" variant="outline">
            {d.blog.backToBlog}
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Article Header */}
      <section className="pt-12 pb-8 md:pt-16 md:pb-10 bg-gradient-to-b from-bg-warm to-bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-brown-button text-sm font-medium mb-6 hover:text-brown-button-hover transition-colors"
          >
            ← {d.blog.backToBlog}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-brown-accent text-brown-primary rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-brown-secondary/70">{post.date}</span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brown-primary leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src="/mizuki.jpeg"
                alt="Mizuki"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-brown-primary">Mizuki</p>
              <p className="text-xs text-brown-secondary/70">{post.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-8 md:py-12 bg-bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {post.image && (
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 bg-brown-accent">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="prose-custom space-y-6">
            {post.content.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p key={index} className="text-brown-secondary leading-relaxed">
                    {block.text}
                  </p>
                );
              }
              if (block.type === 'heading') {
                return (
                  <h2
                    key={index}
                    className="text-xl font-semibold text-brown-primary mt-8 mb-4"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={index} className="space-y-2 pl-1">
                    {block.items?.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-brown-secondary"
                      >
                        <span className="text-brown-button mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'tip') {
                return (
                  <div
                    key={index}
                    className="bg-bg-section border-l-4 border-brown-button rounded-r-2xl p-4"
                  >
                    <p className="text-brown-primary text-sm font-medium mb-1">
                      💡 Tip
                    </p>
                    <p className="text-brown-secondary text-sm">{block.text}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-border-light">
            <Button href="/blog" variant="outline">
              ← {d.blog.backToBlog}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
