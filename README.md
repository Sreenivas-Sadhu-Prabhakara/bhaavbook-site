# BhaavBook — explainer site

Standalone marketing / explainer page for **BhaavBook**.

> **Chase the quote, win the job.** — subscription · pricing on discovery

Build a quote, track its status, and auto-nudge until it converts. For contractors,
fabricators, interior designers and AMC vendors.

## The wedge

The quote is the top of the funnel and nobody follows up on a cold one — a nudge is
free money. BhaavBook builds the quote, prints a clean branded page at `/quote/{id}`,
tracks Sent → Opened → Accepted, and drops a polite follow-up into your outbox at
**T+2** and **T+5** days if the quote is still cold.

## What's here

| File | Purpose |
|------|---------|
| `index.html` | The full one-page site (9 sections). |
| `styles.css` | All styling. Violet (`#7C3AED`) on warm estimate-book paper. |
| `app.js` | Sticky nav, smooth scroll, animated dashboard counters, live nudge-ladder reveal. |
| `favicon.svg` | Inline SVG quote-slip mark. |

## Design notes

- **Palette:** violet accent `#7C3AED`, violet-undertoned ink `#1A1425`, warm paper
  `#FAF7F2`, muted violet tint `#EDE7F6`, plus a functional green (won) and amber
  (needs follow-up).
- **Type:** system font stack throughout; **tabular monospace** for every rupee value
  and quote ID — the "estimate book / receipt" tell that ties the whole page together.
- **Signature:** the perforated quotation slip in the hero, with the auto-nudge ladder
  ticking out into a WhatsApp-style outbox.

## Running / deploying

Fully self-contained — no build step, no CDNs, no external fonts or images.

```bash
# open locally
open index.html            # macOS

# or serve
python3 -m http.server 8080
```

Deploy the folder as-is to any static host (Netlify, Cloudflare Pages, GitHub Pages,
Vercel). Nothing to configure.

## Accessibility

Responsive down to mobile (no horizontal page scroll; the wide dashboard table scrolls
inside its own container), visible keyboard focus rings, and `prefers-reduced-motion`
respected (animations collapse to their final state).

---

A **KARYA** studio build · [sreeni.nintendo@gmail.com](mailto:sreeni.nintendo@gmail.com)
