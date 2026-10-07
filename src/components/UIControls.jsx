// Dark mode toggle only (language toggle removed)
import { Moon, Sun } from 'lucide-react';

export function DarkModeToggle({ dark, setDark }) {
  return (
    <button
      className="dark-toggle"
      onClick={() => setDark(d => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
    </button>
  );
}
