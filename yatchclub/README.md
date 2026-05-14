# AQUAVISTA — Luxury Yacht Tourism Website

A production-grade **Next.js + Headless WordPress** application for a luxury yacht charter business.

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | WordPress (Headless via REST API) |
| HTTP | Native `fetch` with ISR |
| Icons | Lucide React |
| Fonts | Playfair Display + Outfit (Google Fonts) |

---

## Project Structure

```
yatchclub/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles + Tailwind theme
│   ├── not-found.tsx           # 404 page
│   └── yachts/
│       ├── page.tsx            # Yacht listing (paginated)
│       └── [slug]/
│           └── page.tsx        # Dynamic yacht detail page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with scroll effect
│   │   └── Footer.tsx          # Newsletter + social links
│   ├── sections/
│   │   ├── HeroCarousel.tsx    # Full-screen carousel with CMS slides
│   │   ├── StatsSection.tsx    # Animated counter section
│   │   ├── FleetPreview.tsx    # Homepage yacht grid preview
│   │   ├── TestimonialCarousel.tsx  # Auto-rotating testimonials
│   │   └── ContactCTA.tsx      # WhatsApp + phone CTA section
│   ├── yacht/
│   │   ├── YachtCard.tsx       # Individual yacht card
│   │   └── YachtGrid.tsx       # Responsive grid wrapper
│   └── ui/
│       ├── Button.tsx          # Polymorphic button (link/button/external)
│       ├── SectionTitle.tsx    # Consistent section headings
│       ├── ImageGallery.tsx    # Grid gallery with lightbox
│       └── VideoEmbed.tsx      # YouTube embed with poster
│
├── services/
│   ├── api.ts                  # Base fetch + axios setup
│   ├── yachts.ts               # Yacht CRUD from WP REST API
│   └── homepage.ts             # Stats, testimonials, hero slides
│
├── hooks/
│   ├── useCounter.ts           # Animated number counter
│   └── useInView.ts            # Intersection Observer hook
│
├── lib/
│   └── constants.ts            # Site-wide constants + fallbacks
│
├── types/
│   └── index.ts                # All TypeScript interfaces
│
└── utils/
    ├── cn.ts                   # Tailwind class merging utility
    └── transformers.ts         # WP API response → app types
```

---

## WordPress CMS Setup

### 1. Install Required Plugins

- **Advanced Custom Fields (ACF)** — for custom fields on all post types
- **ACF to REST API** — exposes ACF fields in the WP REST API
- **Custom Post Type UI** — to register `yachts` and `testimonials` CPTs
- **WP CORS** (or configure manually) — to allow requests from your Next.js domain

### 2. Register Custom Post Types

**Yachts** (`yachts`)
```
Slug: yachts
Public: true
REST API: true
REST Base: yachts
```

**Testimonials** (`testimonials`)
```
Slug: testimonials
Public: true
REST API: true
REST Base: testimonials
```

### 3. ACF Field Groups

#### Yacht Fields (attached to: `yachts`)

| Field Name | Type | Description |
|---|---|---|
| `short_description` | Textarea | One-liner for cards |
| `featured_image` | Image | Main image (returns array) |
| `gallery` | Gallery | Multiple images |
| `youtube_link` | URL | YouTube video URL |
| `pricing` | Text | e.g. "From $25,000/week" |
| `length` | Text | e.g. "72m" |
| `guests` | Number | Max guests |
| `crew` | Number | Crew count |
| `year_built` | Number | Year |
| `specifications` | Repeater | label + value sub-fields |
| `activities` | Textarea | One activity per line |

#### Testimonial Fields (attached to: `testimonials`)

| Field Name | Type |
|---|---|
| `quote` | Textarea |
| `reviewer_name` | Text |
| `reviewer_title` | Text |
| `reviewer_company` | Text |
| `avatar` | Image |
| `rating` | Number (1–5) |

#### Site Settings (ACF Options Page)

Register an options page in your theme's `functions.php`:
```php
if (function_exists('acf_add_options_page')) {
    acf_add_options_page([
        'page_title' => 'Site Settings',
        'menu_slug'  => 'site_settings',
        'capability' => 'edit_posts',
    ]);
}
```

Fields: `brand_name`, `whatsapp_number`, `instagram_url`, `hero_slides` (repeater), `stats` (group), etc.

---

## Getting Started

```bash
# 1. Clone and install
cd yatchclub
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local with your WordPress URL and WhatsApp number

# 3. Run development server
npm run dev

# 4. Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## REST API Endpoints Used

| Endpoint | Usage |
|---|---|
| `GET /wp/v2/yachts?_embed=true` | Yacht listing |
| `GET /wp/v2/yachts?slug={slug}&_embed=true` | Single yacht |
| `GET /wp/v2/testimonials?_embed=true` | Testimonials |
| `GET /acf/v3/options/site_settings` | Homepage settings |

---

## ISR (Incremental Static Regeneration)

All pages use `export const revalidate = 60` — content refreshes every 60 seconds without a full rebuild. Update in `lib/constants.ts` to change globally.

---

## Adding a New Yacht

1. Log into WordPress admin
2. Go to **Yachts → Add New**
3. Fill in title, description, ACF fields (gallery, specs, pricing, video)
4. Publish — the frontend auto-refreshes within 60 seconds

---

## Deployment

### Vercel (Recommended)
```bash
npx vercel --prod
```
Set environment variables in the Vercel dashboard.

### Docker / Self-hosted
```bash
npm run build
node .next/standalone/server.js
```
