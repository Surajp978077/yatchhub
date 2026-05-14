import { Play } from 'lucide-react';

interface VideoEmbedProps {
  url: string;
  title?: string;
}

function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  // Already an embed URL
  if (url.includes('youtube.com/embed/')) return url;

  // youtu.be short link
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;

  // Standard watch URL
  const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;

  return null;
}

export function VideoEmbed({ url, title = 'Yacht Video Tour' }: VideoEmbedProps) {
  const embedUrl = getYouTubeEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4 text-[#c9a66b]">
        <Play size={18} fill="currentColor" />
        <span className="text-sm font-semibold uppercase tracking-widest">Video Tour</span>
      </div>
      <div className="video-wrapper shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <iframe
          src={`${embedUrl}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
