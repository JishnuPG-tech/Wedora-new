// Analytics tracking (Supabase-based)
// Requires the 'analytics' table to exist in your Supabase project.
// See: supabase/migrations/create_tables.sql
import { useEffect } from 'react';
import { supabase } from '../config/supabase';

export function trackOpen(guestName) {
  if (!supabase) return;
  supabase.from('analytics').insert({
    event: 'card_opened',
    guest_name: guestName || null,
    user_agent: navigator.userAgent,
    opened_at: new Date().toISOString(),
    referrer: document.referrer || null
  }).then(() => {}).catch(() => {}); // silent – table may not exist yet
}

export function trackSection(sectionName) {
  if (!supabase) return;
  supabase.from('analytics').insert({
    event: 'section_viewed',
    section: sectionName,
    visited_at: new Date().toISOString()
  }).then(() => {}).catch(() => {}); // silent – table may not exist yet
}

// Hook: track which section is currently in view
export function useSectionTracker(sectionName) {
  useEffect(() => {
    const timer = setTimeout(() => trackSection(sectionName), 2000);
    return () => clearTimeout(timer);
  }, [sectionName]);
}
