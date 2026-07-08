import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";

function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

function getTokens(dark) {
  return {
    accent: "#c9683a",
    accentLight: "#e8905e",
    accentGlow: dark ? "rgba(201,104,58,0.25)" : "rgba(201,104,58,0.15)",
    textPrimary: dark ? "#fde0d0" : "#3a1508",
    textSecondary: dark ? "#f5b99a" : "#7a3618",
    textMuted: dark ? "rgba(245,185,154,0.5)" : "rgba(122,54,24,0.55)",
    textAccent: dark ? "#e8905e" : "#c9683a",
    borderNav: dark ? "rgba(201,104,58,0.12)" : "rgba(201,104,58,0.18)",
    bgNav: dark ? "#0e0704" : "#fff8f4",
    logoAccent: "#c9683a",
    logoText: dark ? "#fde0d0" : "#3a1508",
    navHover: dark ? "rgba(201,104,58,0.15)" : "rgba(201,104,58,0.08)",
    navText: dark ? "rgba(245,185,154,0.7)" : "rgba(58,21,8,0.6)",
    navTextHover: dark ? "#fde0d0" : "#3a1508",
    dropdownBg: dark ? "rgba(26,14,8,0.97)" : "rgba(255,248,244,0.97)",
    dropdownBorder: dark ? "rgba(201,104,58,0.15)" : "rgba(201,104,58,0.2)",
    dropdownShadow: dark ? "0 12px 40px rgba(201,104,58,0.15)" : "0 12px 40px rgba(122,54,24,0.1)",
    dropdownActiveBg: dark ? "rgba(201,104,58,0.12)" : "rgba(201,104,58,0.08)",
    dropdownActiveText: dark ? "#e8905e" : "#c9683a",
    btnCv: "linear-gradient(to right, #a04e27, #c9683a)",
    btnCvShadow: "0 4px 15px rgba(201,104,58,0.35)",
    btnCvShadowHov: "0 4px 25px rgba(201,104,58,0.55)",
  };
}

const languages = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const dark = useTheme();
  const tk = getTokens(dark);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const currentLang =
    languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => setMobileMenuOpen(false);

  const navLinks = [
    { href: "#about", label: t("about_title") },
    { href: "#projects", label: t("projects_title") },
    { href: "#competences", label: t("skills_title") },
    { href: "#services", label: t("services_title") || "Services" },
    { href: "#languages-interests", label: t("lang_interests_title") || "Langues & Loisirs" },
    { href: "#contact", label: t("contact_title") },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 py-3 transition-all duration-500 ${
          scrolled
            ? "border-b backdrop-blur-xl shadow-md"
            : "border-b backdrop-blur-md"
        }`}
        style={{
          background: scrolled
            ? dark ? "rgba(14,7,4,0.9)" : "rgba(255,248,244,0.9)"
            : dark ? "rgba(14,7,4,0.7)" : "rgba(255,248,244,0.7)",
          borderBottom: `1px solid ${tk.borderNav}`,
        }}
      >
        <div className="flex items-center gap-5">
          <a
            href="#"
            className="shrink-0 text-lg font-black tracking-tight"
            style={{ color: tk.logoText, textDecoration: "none" }}
          >
            <span style={{ color: tk.logoAccent }}>A</span>niyh
          </a>
          <div className="hidden md:block h-5 w-px" style={{ background: tk.borderNav }} />
        </div>

        <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 whitespace-nowrap"
              style={{
                color: tk.navText,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = tk.navTextHover;
                e.currentTarget.style.background = tk.navHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = tk.navText;
                e.currentTarget.style.background = "transparent";
              }}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} style={{ background: tk.logoText }} />
            <span className={`block w-5 h-0.5 transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} style={{ background: tk.logoText }} />
            <span className={`block w-5 h-0.5 transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: tk.logoText }} />
          </button>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium transition-all duration-200"
              style={{
                color: tk.navText,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = tk.navTextHover;
                e.currentTarget.style.borderColor = tk.borderNav;
                e.currentTarget.style.background = tk.navHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = tk.navText;
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 16 }}>{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                style={{
                  opacity: 0.5,
                  transform: langOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
              >
                <path
                  d="M1 3 L5 7 L9 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden z-50"
                style={{
                  minWidth: 145,
                  background: tk.dropdownBg,
                  backdropFilter: "blur(16px)",
                  boxShadow: tk.dropdownShadow,
                  border: `0.5px solid ${tk.dropdownBorder}`,
                }}
              >
                {languages.map((lang) => {
                  const isActive = i18n.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`flex items-center w-full gap-3 px-4 py-2 text-left text-sm font-medium transition-colors ${
                        isActive ? "bg-terra-500/10" : ""
                      }`}
                      style={{
                        color: isActive ? tk.dropdownActiveText : tk.navText,
                        background: isActive ? tk.dropdownActiveBg : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = tk.navHover;
                          e.currentTarget.style.color = tk.navTextHover;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = tk.navText;
                        }
                      }}
                    >
                      <span style={{ fontSize: 18 }}>{lang.flag}</span>
                      <span>{lang.label}</span>
                      {isActive && <span className="ml-auto">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <ThemeToggle />

          <a
            href="/CVLydivine.pdf"
            download
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-white font-bold text-sm transition-all duration-200"
            style={{
              background: tk.btnCv,
              boxShadow: tk.btnCvShadow,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = tk.btnCvShadowHov;
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = tk.btnCvShadow;
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6.5 1v8M3 6l3.5 3.5L10 6M2 12h9"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">{t("download_cv")}</span>
            <span className="sm:hidden">CV</span>
          </a>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-[65px] left-4 right-4 z-40 rounded-2xl backdrop-blur-xl border p-4 md:hidden"
          style={{
            background: tk.dropdownBg,
            borderColor: tk.dropdownBorder,
          }}
        >
          <div className="flex flex-col gap-3">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleLinkClick}
                className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                style={{
                  color: tk.navText,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = tk.navTextHover;
                  e.currentTarget.style.background = tk.navHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = tk.navText;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}