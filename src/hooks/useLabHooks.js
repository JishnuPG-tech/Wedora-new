// Hooks only — shared state for dark mode and language
import { useEffect, useState } from 'react';

export function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('wc-dark') === 'true');
  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark);
    localStorage.setItem('wc-dark', String(dark));
  }, [dark]);
  return [dark, setDark];
}

export function useLanguage() {
  const [lang, setLang] = useState(() => localStorage.getItem('wc-lang') || 'en');
  useEffect(() => { localStorage.setItem('wc-lang', lang); }, [lang]);
  return [lang, setLang];
}
