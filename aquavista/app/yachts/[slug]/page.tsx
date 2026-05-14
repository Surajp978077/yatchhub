import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ImageGallery } from '@/components/yachts/ImageGallery';
import { VideoEmbed } from '@/components/yachts/VideoEmbed';
import { SpecsList, ActivitiesList } from '@/components/yachts/SpecsList';
import { Footer } from '@/components/layout/Footer';
import { RevealWrapper } from '@/components/ui/RevealWrapper';
import { getYachtBySlug, getAllYachtSlugs } from '@/services/yachts';
import { getHomepageSettings } from '@/services/homepage';

export const revalidate = 300;

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllYachtSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const yacht = await getYachtBySlug(slug);
  if (!yacht) return { title: 'Yacht Not Found' };

  return {
    title: yacht.title,
    description: yacht.acf.short_description || `Charter ${yacht.title} – a luxury superyacht experience.`,
    openGraph: {
      title: yacht.title,
      description: yacht.acf.short_description,
      images: yacht.acf.featured_image?.url
        ? [{ url: yacht.acf.featured_image.url }]
        : [],
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function YachtDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [yacht, settings] = await Promise.all([
    getYachtBySlug(slug),
    getHomepageSettings(),
  ]);

  if (!yacht) notFound();

  const { title, content, acf } = yacht;
  const {
    gallery,
    youtube_link,
    pricing,
    specifications,
    activities,
    short_description,
    featured_image,
  } = acf;

  // Build gallery: prefer ACF gallery array, fallback to featured_image
  const allImages = gallery?.length
    ? gallery
    : featured_image?.url
    ? [featured_image]
    : [];

  const waNumber = settings.whatsapp_number ?? '1234567890';

  return (
    <>
      <div className="min-h-screen bg-[#0a1128]">
        {/* Top spacer for fixed navbar */}
        <div className="h-20" />

        {/* Back link */}
        <div className="max-w-[1400px] mx-auto px-[5%] pt-8 pb-4">
          <Link
            href="/yachts"
            className="inline-flex items-center gap-2 text-white/40 hover:text-[#c9a66b] text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Fleet
          </Link>
        </div>

        {/* Main content */}
        <div className="max-w-[1400px] mx-auto px-[5%] pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 mt-6">
            {/* Left: Gallery + Video */}
            <RevealWrapper>
              <ImageGallery images={allImages} title={title} />
              {youtube_link && (
                <VideoEmbed url={youtube_link} title={`${title} Video Tour`} />
              )}
            </RevealWrapper>

            {/* Right: Details */}
            <RevealWrapper delay={100}>
              <div className="sticky top-28 space-y-8">
                {/* Title */}
                <div>
                  <span className="block text-[#c9a66b] uppercase tracking-[4px] text-xs font-semibold mb-2">
                    Luxury Superyacht
                  </span>
                  <h1 className="font-serif text-4xl md:text-5xl text-white font-black leading-tight">
                    {title}
                  </h1>
                </div>

                {/* Short description */}
                {short_description && (
                  <p className="text-white/60 text-base leading-relaxed">
                    {short_description}
                  </p>
                )}

                {/* Pricing */}
                {pricing?.starting_from && (
                  <div className="glass-card rounded-xl p-6">
                    <span className="block text-white/40 uppercase tracking-widest text-xs mb-1">
                      Charter From
                    </span>
                    <div className="text-[#c9a66b] font-serif text-3xl font-bold">
                      {pricing.currency ?? '$'}{pricing.starting_from}
                      {pricing.period && (
                        <span className="text-white/40 text-lg font-normal ml-2">
                          / {pricing.period}
                        </span>
                      )}
                    </div>
                    {pricing.note && (
                      <p className="text-white/30 text-xs mt-2">{pricing.note}</p>
                    )}
                  </div>
                )}

                {/* Specs */}
                {specifications && Object.keys(specifications).length > 0 && (
                  <SpecsList specifications={specifications} />
                )}

                {/* Activities */}
                {activities?.length > 0 && (
                  <ActivitiesList activities={activities} />
                )}

                {/* Book CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${waNumber}?text=${encodeURIComponent(`Hi! I'm interested in chartering ${title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2
                      bg-[#c9a66b] text-[#0a1128] font-bold py-4 rounded
                      hover:bg-[#e0c097] hover:scale-105 transition-all duration-300"
                  >
                    <MessageCircle size={20} />
                    Inquire Now
                  </a>
                  <Link
                    href="/yachts"
                    className="flex-1 flex items-center justify-center gap-2
                      border border-white/20 text-white/70 font-semibold py-4 rounded
                      hover:border-[#c9a66b] hover:text-[#c9a66b] transition-all duration-300"
                  >
                    View All Yachts
                  </Link>
                </div>
              </div>
            </RevealWrapper>
          </div>

          {/* Full description */}
          {content && (
            <RevealWrapper className="mt-16">
              <div className="glass-card rounded-2xl p-10 md:p-14">
                <h2 className="font-serif text-2xl text-[#c9a66b] mb-6">About This Yacht</h2>
                <div
                  className="text-white/60 leading-relaxed prose prose-invert prose-p:text-white/60 max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </RevealWrapper>
          )}
        </div>
      </div>

      <Footer
        tagline={settings.footer_tagline}
        socialLinks={settings.social_links}
      />
    </>
  );
}
