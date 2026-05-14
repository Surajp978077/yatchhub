# WordPress Headless CMS Setup Guide

This document describes the exact WordPress configuration required to power the Aquavista frontend.

---

## 1. Required Plugins

| Plugin | Purpose |
|---|---|
| **Advanced Custom Fields PRO** | Custom field groups (gallery, specs, pricing, etc.) |
| **ACF to REST API** | Exposes ACF fields in the WP REST API (`?_fields=acf`) |
| **Custom Post Type UI** (optional) | GUI to register CPTs (or use code below) |
| **WP CORS** or custom headers | Allow cross-origin requests from the Next.js domain |

---

## 2. Custom Post Types

Add to `functions.php` (or a plugin):

```php
// ── Yachts CPT ────────────────────────────────────────────────────────────────
function aquavista_register_cpts() {
    register_post_type( 'yachts', [
        'labels'       => [
            'name'          => 'Yachts',
            'singular_name' => 'Yacht',
            'add_new_item'  => 'Add New Yacht',
            'edit_item'     => 'Edit Yacht',
        ],
        'public'       => true,
        'show_in_rest' => true,   // Required for REST API
        'rest_base'    => 'yachts',
        'has_archive'  => false,
        'rewrite'      => [ 'slug' => 'yachts' ],
        'supports'     => [ 'title', 'editor', 'thumbnail', 'slug' ],
        'menu_icon'    => 'dashicons-anchor',
    ] );

    // ── Testimonials CPT ──────────────────────────────────────────────────────
    register_post_type( 'testimonials', [
        'labels'       => [
            'name'          => 'Testimonials',
            'singular_name' => 'Testimonial',
        ],
        'public'       => false,
        'show_in_rest' => true,
        'rest_base'    => 'testimonials',
        'show_ui'      => true,
        'supports'     => [ 'title' ],
        'menu_icon'    => 'dashicons-format-quote',
    ] );
}
add_action( 'init', 'aquavista_register_cpts' );
```

---

## 3. ACF Field Groups

### Field Group: Yacht Details
**Location:** Post Type → Yachts

| Field Name | Type | Key |
|---|---|---|
| Featured Image | Image (returns array) | `featured_image` |
| Gallery | Gallery | `gallery` |
| Short Description | Textarea | `short_description` |
| YouTube Link | URL | `youtube_link` |
| Pricing | Group | `pricing` |
| → Starting From | Text | `starting_from` |
| → Currency | Select (USD/EUR/GBP/AED) | `currency` |
| → Period | Text (e.g. "per week") | `period` |
| → Note | Text | `note` |
| Specifications | Group | `specifications` |
| → Length | Text | `length` |
| → Year Built | Text | `year_built` |
| → Max Speed | Text | `max_speed` |
| → Crew | Text | `crew` |
| → Staterooms | Text | `staterooms` |
| → Guests | Text | `guests` |
| Activities | Repeater → Text (activity) | `activities` |

### Field Group: Testimonial
**Location:** Post Type → Testimonials

| Field Name | Type | Key |
|---|---|---|
| Quote | Textarea | `quote` |
| Author Name | Text | `author_name` |
| Author Title | Text | `author_title` |
| Avatar | Image | `avatar` |

### Field Group: Homepage Settings (Options Page)
**Location:** Options Page

| Field Name | Type | Key |
|---|---|---|
| Hero Slides | Repeater | `hero_slides` |
| → Headline | Text | `headline` |
| → Subheadline | Textarea | `subheadline` |
| → Image | Image | `image` |
| → CTA Label | Text | `cta_label` |
| → CTA Link | URL | `cta_link` |
| Stats | Repeater | `stats` |
| → Label | Text | `label` |
| → Value | Number | `value` |
| → Suffix | Text | `suffix` |
| WhatsApp Number | Text (digits only) | `whatsapp_number` |
| Footer Tagline | Textarea | `footer_tagline` |
| Social Links | Group | `social_links` |
| → Instagram | URL | `instagram` |
| → WhatsApp | URL | `whatsapp` |
| → Phone | Text | `phone` |
| → Email | Email | `email` |

---

## 4. Options Page Registration

```php
if ( function_exists( 'acf_add_options_page' ) ) {
    acf_add_options_page( [
        'page_title' => 'Homepage Settings',
        'menu_title' => 'Site Settings',
        'menu_slug'  => 'site-settings',
        'capability' => 'edit_posts',
        'redirect'   => false,
    ] );
}
```

---

## 5. CORS Headers

Allow the Next.js frontend to query the REST API:

```php
function aquavista_cors_headers() {
    $allowed_origins = [
        'https://www.aquavista.com',
        'http://localhost:3000',  // Remove in production
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ( in_array( $origin, $allowed_origins, true ) ) {
        header( "Access-Control-Allow-Origin: $origin" );
    }
    header( 'Access-Control-Allow-Methods: GET, OPTIONS' );
    header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
}
add_action( 'rest_api_init', function() {
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
    add_filter( 'rest_pre_serve_request', function( $value ) {
        aquavista_cors_headers();
        return $value;
    } );
} );
```

---

## 6. REST API Endpoints Used by the Frontend

| Endpoint | Description |
|---|---|
| `GET /wp/v2/yachts?per_page=50` | All yachts |
| `GET /wp/v2/yachts?slug={slug}` | Single yacht by slug |
| `GET /wp/v2/testimonials?per_page=10` | Testimonials |
| `GET /acf/v3/options/options` | Homepage settings (ACF to REST API plugin) |

---

## 7. Local Development Workflow

1. Set up WordPress locally (MAMP/LocalWP/DDEV)
2. Copy `.env.example` → `.env.local`
3. Set `NEXT_PUBLIC_WP_API_URL=http://localhost:8888/wp-json` (or your local URL)
4. Run `npm run dev`
5. The app falls back to built-in mock data if WordPress is unreachable

---

## 8. Production Checklist

- [ ] Set `NEXT_PUBLIC_WP_API_URL` to production WP URL
- [ ] Update `next.config.ts` `remotePatterns` to your WP domain
- [ ] Remove `localhost` from CORS allowed origins
- [ ] Enable WordPress caching (WP Super Cache / LiteSpeed Cache)
- [ ] Set strong WordPress admin password
- [ ] Disable XML-RPC if not needed
- [ ] Keep WordPress + plugins updated
