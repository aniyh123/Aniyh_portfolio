import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Initialisation synchrone : si localStorage n'est pas "light", on active le mode sombre
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved !== "light"; // true par défaut (mode sombre)
  });

  // Appliquer le thème au DOM et sauvegarder
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-lg px-2 py-1.5 text-sm transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10"
    >
      {dark ? "🌙" : "☀️"}
    </button>
  );
}