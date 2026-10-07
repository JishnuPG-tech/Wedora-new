import { supabase } from "../config/supabase";

export async function trackOpen(guestName = null) {
  if (!supabase) return;
  try {
    await supabase.from("analytics").insert({
      event: "card_opened",
      guest_name: guestName,
      user_agent: navigator.userAgent,
      opened_at: new Date().toISOString(),
      referrer: document.referrer || null,
    });
  } catch {}
}

export async function trackSection(section) {
  if (!supabase) return;
  try {
    await supabase.from("analytics").insert({ event: "section_viewed", section, visited_at: new Date().toISOString() });
  } catch {}
}
