# Wedora Design Architecture

## Product idea

Wedora should feel like a digital invitation first and a website second.

The visual system is built around:
- cinematic entry
- editorial typography
- natural scroll
- photography-led sections
- restrained interaction chrome
- data-driven wedding content
- mobile-first touch targets

## Application structure

React + Vite is the runtime. Framer Motion handles reveal, parallax, transition and lightbox motion. Lucide provides UI icons.

The invitation is manually routed:
- / opens the guest invitation
- /admin opens the host studio

No client-side router is required for this template.

## Data layer

Wedding-specific information belongs in \`src/config/weddingData.js\`.

The data model contains:
- couple
- dates
- events
- families
- hosts
- story
- RSVP rules
- gallery

Components should render from this configuration instead of duplicating client-specific names, venues or dates.

## Visual tokens

The primary design tokens live at the top of \`src/index.css\`.

Core tokens:
- ivory and paper surfaces
- eucalyptus greens
- antique gold accents
- editorial serif typography
- compact uppercase labels
- generous section spacing

Night mode is implemented by applying \`theme-night\` to the document body and swapping the same CSS variables. The markup remains unchanged.

## Interaction system

### Opening
The envelope is a single interaction gate. The seal, flap and paper animate as one sequence, then reveal the invitation.

### Scroll
Strict scroll snap is intentionally avoided. Guests can move naturally through long content. A 2px gold progress line provides orientation, while SectionNav highlights the active chapter.

### Gallery
Photos are lazy-loaded and opened in an overlay with:
- Escape to close
- Left and Right Arrow navigation
- previous and next controls
- body scroll locking while open

### RSVP
RSVP is a four-step progressive form:
1. name
2. attendance
3. guest details
4. message

The form writes directly to the Supabase \`rsvps\` table when configured.

## Host studio

The /admin experience uses Supabase Auth instead of a hardcoded PIN.

The dashboard reads RSVP data from Supabase and shows:
- total replies
- confirmed attendance
- declined replies
- total guest seats
- searchable responses
- CSV export

Production deployment should pair this UI with Supabase Row Level Security policies that restrict RSVP access to authenticated hosts and allow only the intended public insert policy.

## Performance principles

- Prefer static imagery over iframe maps.
- Do not autoplay audio. The music player uses preload=\"none\".
- Lazy-load gallery images.
- Keep animation transforms on compositor-friendly properties.
- Avoid strict scroll containers and duplicated gallery asset pipelines.
- Keep public assets as the stable URL source for gallery images.

## Future themes

The architecture supports theme packs without changing the invitation flow. A future theme should primarily change:
- token values
- decorative motifs
- opening animation treatment
- typography
- weddingData copy

Possible future themes:
- Royal Heritage
- Islamic Royal
- Christian Elegant
- Minimal Champagne

The invitation journey remains the shared product foundation.
