export const weddingData = {
  couple: { groom: "Anand", bride: "Meera", ampersand: "&", initials: "A&M", displayName: "Anand & Meera" },
  dates: {
    preciseDateIso: "2026-05-20T10:30:00+05:30",
    rsvpDeadlineIso: "2026-05-10T23:59:59+05:30",
    calendar: { dayOfWeek: "Wednesday", dayNumber: "20", month: "May", year: "2026" },
    headerDisplay: "May 20 · 2026",
    displayFull: "20 May 2026",
    icsFormat: { dateStart: "20260520T050000Z", dateEnd: "20260520T160000Z" }
  },
  events: [
    { id: "ceremony", kicker: "The Sacred Moment", titleEn: "Muhurtham", titleMl: "മുഹൂർത്തം", timeText: "10:30 AM – 11:15 AM", venue: "Kalyana Mandapam", address: "12/45 Temple Road, Thrissur, Kerala · 680 001", mapUrl: "https://maps.google.com/?q=Kalyana+Mandapam+Thrissur+Kerala" },
    { id: "reception", kicker: "An Evening Together", titleEn: "Reception", titleMl: "സൽക്കാരം", timeText: "6:00 PM onwards", venue: "Royal Gardens Banquet Hall", address: "Palace Road, Near Sakthan Bus Stand, Thrissur, Kerala · 680 001", mapUrl: "https://maps.google.com/?q=Royal+Gardens+Banquet+Hall+Thrissur" }
  ],
  hosts: ["Mr. & Mrs. Krishnan Nair", "Mr. & Mrs. Suresh Menon"],
  family: {
    groom: { name: "Anand Krishnan", father: "Mr. Krishnan Nair", mother: "Mrs. Santha Krishnan", relation: "Son of" },
    bride: { name: "Meera Suresh", father: "Mr. Suresh Menon", mother: "Mrs. Leela Suresh", relation: "Daughter of" }
  },
  strings: {
    inviteSecondaryEn: "Together with their families, they joyfully invite you to celebrate their marriage.",
    invitePrimaryMl: "വിവാഹ ക്ഷണം",
    envelopeSmallTitle: "വിവാഹ ക്ഷണം",
    heroEyebrow: "A celebration of love, family & forever",
    closingLine: "Thank you for being part of the beginning of our forever.",
    whatsappShareText: "You're invited to the wedding of Anand & Meera · 20 May 2026 · Thrissur"
  },
  story: [
    { number: "01", title: "The first hello", text: "Two lives met, and an ordinary moment became a beginning." },
    { number: "02", title: "The promise", text: "A thousand small memories turned into one beautiful certainty." },
    { number: "03", title: "The celebration", text: "Now we gather the people we love and celebrate what comes next." }
  ],
  rsvp: { maxGuests: 5 },
  gallery: [
    { src: "/gallery/photo1.jpg", fallback: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=82", alt: "Together", span: "tall", label: "Together" },
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=82", fallback: "/gallery/photo2.jpg", "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=82", alt: "Garden walk", span: "wide", label: "Garden walk" },
    { src: "/gallery/photo3.jpg", fallback: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=82", alt: "Laughing", span: "tall", label: "Laughing" },
    { src: "/gallery/photo4.jpg", fallback: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=1400&q=82", alt: "Sunset", span: "wide", label: "Sunset" },
    { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=82", fallback: "/gallery/photo5.jpg", "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=82", alt: "Flowers", span: "square", label: "Flowers" },
    { src: "/gallery/photo6.jpg", fallback: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=82", alt: "Temple", span: "tall", label: "Temple" }
  ]
};

export const eventDate = new Date(weddingData.dates.preciseDateIso);
