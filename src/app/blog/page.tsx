'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/i18n';
import { HeroSection, Card } from '@/components';

export default function BlogPage() {
  const { dictionary: d } = useLanguage();

  return (
    <>
      {/* Hero */}
      <HeroSection
        title={d.blog.hero.title}
        description={d.blog.hero.subtitle}
        size="small"
      />

      {/* Blog Posts */}
      <section className="py-16 md:py-20 bg-bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {d.blog.posts.length > 0 && (
            <div className="mb-12">
              <Link href={`/blog/${d.blog.posts[0].slug}`}>
                <Card hover className="overflow-hidden">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-2/5 flex-shrink-0">
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-brown-accent">
                        {d.blog.posts[0].image ? (
                          <Image
                            src={d.blog.posts[0].image}
                            alt={d.blog.posts[0].title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl">
                            ☕
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-brown-accent text-brown-primary rounded-full">
                          {d.blog.posts[0].category}
                        </span>
                        <span className="text-sm text-brown-secondary/70">
                          {d.blog.posts[0].date}
                        </span>
                      </div>
                      <h2 className="text-xl md:text-2xl font-semibold text-brown-primary mb-3">
                        {d.blog.posts[0].title}
                      </h2>
                      <p className="text-brown-secondary leading-relaxed mb-4">
                        {d.blog.posts[0].excerpt}
                      </p>
                      <span className="text-brown-button font-medium text-sm">
                        {d.blog.readMore} →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {/* Post Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {d.blog.posts.slice(1).map((post, index) => (
              <Link key={index} href={`/blog/${post.slug}`}>
                <Card hover className="h-full overflow-hidden">
                  <div className="relative aspect-[16/9] -mx-6 -mt-6 mb-4 overflow-hidden bg-brown-accent">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        📝
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-brown-accent text-brown-primary rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-brown-secondary/70">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-brown-primary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-brown-secondary text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          {/* Coming Soon Note */}
          <div className="mt-12 text-center">
            <p className="text-brown-secondary/70 text-sm">
              {d.blog.moreComingSoon}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
