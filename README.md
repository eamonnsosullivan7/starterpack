# starterpack

A reusable site template: **Astro** (frontend) + **Sanity** (CMS) + **Vercel** (hosting).

## Approach: developer-defined pages, Sanity-controlled content

Pages are fixed Astro templates you build (`index.astro`, `services/index.astro`,
`about.astro`, etc.) — not a generic drag-and-drop page builder. Sanity's job
is to feed structured content into specific slots on those templates: a list
of services, a set of testimonials, hero text, an about-page body.

This trades "client can invent a brand-new page layout" for "client can
safely edit content without breaking anything" — the right trade for a
single business site where you already know what pages it needs.

## Structure

```
starterpack/
├── src/
│   ├── layouts/Layout.astro
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── ServiceCard.astro
│   │   └── TestimonialCard.astro
│   ├── pages/
│   │   ├── index.astro         # homepage: hero + featured services/testimonials
│   │   ├── about.astro         # fixed page, content from a "simplePage" doc
│   │   └── services/
│   │       ├── index.astro     # lists every "service" document
│   │       └── [slug].astro    # one page per service (still dynamic, but
│   │                           # scoped to a single content type — not
│   │                           # arbitrary page structure)
│   └── lib/sanity.ts           # typed queries per content type
├── studio/
│   ├── sanity.config.ts
│   └── schemaTypes/
│       ├── siteSettings.ts     # singleton: nav (label + path), logo, socials
│       ├── homepage.ts         # singleton: hero fields + featured refs
│       ├── service.ts          # repeatable: title, summary, description, price
│       ├── testimonial.ts      # repeatable: quote, author, photo
│       └── simplePage.ts       # repeatable: title + rich text, for About/Contact
├── astro.config.mjs
└── .env.example
```

## Adding a new page

Since pages are fixed templates, adding one is a small dev task, not a
client-only action:

1. Create the `.astro` file under `src/pages/` (or a subfolder for a section).
2. Add a query to `src/lib/sanity.ts` if it needs its own content type.
3. If it's just heading + rich text (like About), reuse the existing
   `simplePage` schema — create a new `simplePage` document in the Studio
   with a matching slug, no schema change needed.
4. Add it to `siteSettings.nav` in the Studio so it shows up in navigation.

## What the client _can_ do without you

- Edit homepage hero text/image, and which services/testimonials are featured
- Add, edit, remove, and reorder `service` documents (each automatically
  gets its own `/services/<slug>` page)
- Add, edit, remove `testimonial` documents
- Edit the rich text body of any `simplePage` (About, Contact, etc.)
- Edit site settings: logo, nav labels, social links

## Getting started

1. **Create a Sanity project** at sanity.io/manage, note the project ID.
2. Install dependencies:
   ```bash
   npm install
   cd studio && npm install sanity @sanity/vision && cd ..
   ```
3. Copy `.env.example` to `.env` and fill in your Sanity project ID/dataset.
4. Run the Studio locally to add content:
   ```bash
   cd studio && npx sanity dev
   ```
   Create `siteSettings` and `homepage` singleton documents, plus a few
   `service`/`testimonial`/`simplePage` documents.
5. Run the Astro site:
   ```bash
   npm run dev
   ```

## Deploying

- **Astro site → Vercel**: import the repo, Vercel auto-detects Astro. Add
  `SANITY_PROJECT_ID` and `SANITY_DATASET` as environment variables.
- **Sanity Studio**: deploy separately with `npx sanity deploy` from
  inside `/studio` — gives editors a hosted URL, independent from the
  Vercel site deploy.
- **Rebuild on content change**: add a Sanity webhook that hits a Vercel
  Deploy Hook URL whenever a document changes, so the static site rebuilds
  automatically when someone publishes an edit.

## Reusing this for the next site

The reusable part is the **components and patterns**, not a shared data
schema — each new site will likely want its own service/testimonial fields.
When starting a new project:

1. Fork/clone this repo as a starting point.
2. Spin up a new Sanity project (or dataset).
3. Keep `Hero.astro`, the singleton/reference patterns, and the
   `simplePage` type for miscellaneous content pages — adjust
   `service`/`testimonial` fields (or replace them entirely) to fit the
   new site's actual content.

## Adding React or Vue islands later

Astro supports both side by side if a page ever needs real interactivity:

```bash
npx astro add react
# or
npx astro add vue
```

Then drop a `.tsx`/`.vue` component into a `.astro` file with a `client:*`
directive, e.g. `<MyForm client:visible />`. Everything else stays zero-JS.
