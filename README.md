# Wedora E-Wedding Platform

A premium, highly customizable, mobile-first wedding invitation web application. Designed for modern couples to provide an elegant digital experience to their guests.

## Overview

This repository contains the production-ready source code for the Wedora wedding invitation template. Built with modern web technologies, it features a sophisticated UI, smooth animations, RSVP management, and a dedicated admin dashboard.

## Technical Stack

- Framework: React 19 / Vite 8
- Styling: Tailwind CSS v4
- Animation: Framer Motion v12
- Backend: Supabase (for RSVP and Analytics)
- Icons: Lucide React

## Core Features

- Hero & Countdown: Dynamic landing view with high-quality typography and a precise countdown to the event.
- Event Details: Structured timeline for ceremonies, receptions, and venue directions.
- RSVP Management: Guest registration system that syncs directly with the Supabase database.
- Admin Dashboard: Secure, private route (`/admin`) for hosts to monitor RSVP responses, export guest lists, and track page analytics.
- Media Support: Integrated background music player and dynamic photo gallery.
- Responsive Design: Optimized specifically for mobile viewing while maintaining fidelity on desktop displays.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for database functionality)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ADMIN_PASSWORD=your_secure_dashboard_password
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Configuration

All event-specific data (names, dates, venues, strings) is centralized in `src/config/weddingData.js`. Modify this single configuration file to adapt the template for new clients without altering the underlying component structure.

## Deployment

This application is configured for seamless deployment on Vercel. 
1. Import the repository into your Vercel dashboard.
2. Ensure the build command is set to `npm run build` and output directory to `dist`.
3. Add the required environment variables in the Vercel project settings.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
