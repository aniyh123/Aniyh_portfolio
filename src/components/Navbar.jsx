import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ThemeToggle from "./ThemeToggle";

const languages = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export default function Navbar() {
  const { i18n, t } = useTranslation();
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
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-5 px-5 py-2.5 rounded-2xl border transition-all duration-500 ${
          scrolled
            ? "bg-black/80 border-white/10 backdrop-blur-xl shadow-lg shadow-purple-500/20"
            : "bg-black/50 border-white/5 backdrop-blur-md"
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="shrink-0 text-lg font-black tracking-tight text-white"
          style={{ textDecoration: "none" }}
        >
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            A
          </span>
          niyh
        </a>

        {/* Divider visible uniquement sur desktop */}
        <div className="hidden md:block h-5 w-px bg-white/10" />

        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
              style={{ textDecoration: "none" }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Divider desktop */}
        <div className="hidden md:block h-5 w-px bg-white/10" />

        {/* Bouton burger mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          aria-label="Menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

        {/* Right actions (langue, thème, CV) */}
        <div className="flex items-center gap-2">
          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-1.5 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/10 hover:bg-white/10 hover:text-white"
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
                  background: "rgba(10,10,15,0.97)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 12px 40px rgba(168,85,247,0.2)",
                  border: "0.5px solid rgba(255,255,255,0.1)",
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
                        isActive
                          ? "bg-purple-700/10 text-purple-500"
                          : "text-white/70 hover:bg-white/5"
                      }`}
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

          {/* Téléchargement du CV */}
          <a
            href="/CV.pdf"
            download
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-white font-bold text-sm"
            style={{
              background: "linear-gradient(to right, #a855f7, #ec4899)",
              boxShadow: "0 4px 15px rgba(168,85,247,0.35)",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 25px rgba(168,85,247,0.55)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(168,85,247,0.35)";
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

      {/* Menu mobile déroulant */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-[72px] left-4 right-4 z-40 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={handleLinkClick}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                style={{ textDecoration: "none" }}
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