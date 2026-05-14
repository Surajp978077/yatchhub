import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, Anchor } from 'lucide-react';
import Button from '@/components/ui/Button';
import ImageGallery from '@/components/ui/ImageGallery';
import VideoEmbed from '@/components/ui/VideoEmbed';
import ContactCTA from '@/components/sections/ContactCTA';
import { getYachtBySlug, getAllYachtSlugs } from '@/services/yachts';
import { DEFAULT_WHATSAPP, FALLBACK_IMAGE } from '@/lib/constants';

interface YachtPageProps {
  params: Promise<{ slug: string }>;
}

// Static Site Generation
export async function generateStaticParams() {
  const slugs = await getAllYachtSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: YachtPageProps): Promise<Metadata> {
  const { slug } = await params;
  const yacht = await getYachtBySlug(slug);

  if (!yacht) return { title: 'Yacht Not Found' };

  return {
    title: yacht.title,
    description: yacht.shortDescription,
    openGraph: {
      title: yacht.title,
      description: yacht.shortDescription,
      images: yacht.featuredImage ? [{ url: yacht.featuredImage }] : [],
    },
  };
}

export default async function YachtDetailPage({ params }: YachtPageProps) {
  const { slug } = await params;
  const yacht = await getYachtBySlug(slug);

  if (!yacht) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={yacht.featuredImage || FALLBACK_IMAGE}
          alt={yacht.featuredImageAlt || yacht.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-navy" />

        <div className="absolute bottom-0 left-0 right-0 pb-12 pt-20 bg-gradient-to-t from-navy">
          <div className="container mx-auto px-5">
            <span className="inline-block w-10 h-px bg-gold mb-5" />
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3">
              {yacht.title}
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">{yacht.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-navy py-20">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-14">
              {/* Description */}
              {yacht.content && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-5">About This Yacht</h2>
                  <div
                    className="text-white/60 leading-relaxed prose-sm prose-invert"
                    dangerouslySetInnerHTML={{ __html: yacht.content }}
                  />
                </div>
              )}

              {/* Gallery */}
              {yacht.gallery.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-5">Gallery</h2>
                  <ImageGallery images={yacht.gallery} />
                </div>
              )}

              {/* Video */}
              {yacht.youtubeLink && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-5">
                    Experience On Board
                  </h2>
                  <VideoEmbed youtubeUrl={yacht.youtubeLink} title={yacht.title} />
                </div>
              )}
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-8">
              {/* Specifications */}
              {yacht.specifications.length > 0 && (
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <Anchor className="w-5 h-5 text-gold" />
                    <h3 className="font-display text-lg font-bold text-white">Specifications</h3>
                  </div>
                  <dl className="grid grid-cols-2 gap-4">
                    {yacht.specifications.map((spec) => (
                      <div
                        key={spec.label}
                        className="bg-white/[0.03] rounded-lg p-3 border border-white/5"
                      >
                        <dt className="text-white/35 text-xs uppercase tracking-widest mb-1">
                          {spec.label}
                        </dt>
                        <dd className="text-white font-semibold text-sm">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Pricing */}
              <div className="bg-gold/5 border border-gold/20 rounded-2xl p-7">
                <h3 className="font-display text-lg font-bold text-white mb-2">Charter Pricing</h3>
                <p className="text-gold text-3xl font-bold mb-4">
                  {yacht.pricing}
                </p>
                <p className="text-white/40 text-sm mb-6">
                  Pricing may vary by season and itinerary. Contact us for a bespoke quote.
                </p>
                <Button
                  href={`https://wa.me/${DEFAULT_WHATSAPP}?text=I'm interested in chartering ${yacht.title}`}
                  external
                  size="md"
                  className="w-full justify-center"
                >
                  Inquire Now
                </Button>
              </div>

              {/* Activities */}
              {yacht.activities.length > 0 && (
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7">
                  <h3 className="font-display text-lg font-bold text-white mb-5">Activities & Amenities</h3>
                  <ul className="space-y-3">
                    {yacht.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span className="text-white/65 text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ContactCTA
        heading={`Charter ${yacht.title}`}
        subheading="Speak directly with our charter specialists to plan your perfect voyage."
      />
    </>
  );
}
