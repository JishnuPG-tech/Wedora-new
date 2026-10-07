# Wedora

Wedora is a cinematic, mobile-first e-wedding invitation built with React, Vite and Framer Motion. The experience is designed to feel like opening a premium invitation rather than browsing a conventional website.

## Experience

- Cinematic envelope opening with a personalized guest greeting
- Editorial full-screen hero with subtle parallax
- Natural scrolling with section-aware navigation
- Event timeline with location actions
- Story section with animated chapter reveals
- Asymmetric photo gallery with keyboard-friendly lightbox
- Family blessings section
- Lightweight venue cards instead of heavy embedded maps
- Multi-step RSVP flow with Supabase persistence
- Supabase-authenticated host studio at /admin
- Day/night visual mode
- Optional music control that loads audio only after interaction
- Social preview image and PWA metadata

## Stack

- React 19
- Vite 8
- Framer Motion 12
- Lucide React
- Tailwind CSS 4 is retained in the toolchain for future theme extensions
- Supabase for RSVP and analytics

## Local setup

Requires Node.js 18+.

\`\`\`bash
npm install
npm run dev
\`\`\`

For RSVP and host features, add:

\`\`\`env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

The host studio uses the Supabase Auth account configured in that project. Do not put a dashboard password fallback into the client bundle.

## Wedding configuration

Client-specific content lives in:

\`src/config/weddingData.js\`

That file controls the couple, dates, events, family details, story copy, gallery metadata and RSVP limits.

## Deployment

The repository is configured for Vercel with the existing \`vercel.json\` SPA rewrite.

\`\`\`bash
npm run build
\`\`\`

## Design direction

Wedora follows an editorial Kerala-inspired palette of ivory, eucalyptus green and antique gold. The interface intentionally uses fewer generic cards, more photography, stronger typography, cinematic transitions and restrained floating controls.

## License

MIT. See LICENSE.
