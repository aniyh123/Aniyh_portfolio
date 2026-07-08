import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = (e) => setMatches(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

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
    bgPage:        dark ? "#1a0e08"  : "#fff8f4",
    bgCard:        dark ? "rgba(42,22,10,0.95)"  : "rgba(253,224,208,0.35)",
    bgCardHov:     dark ? "rgba(58,30,12,0.98)"  : "rgba(253,224,208,0.6)",
    borderCard:    dark ? "rgba(201,104,58,0.2)"  : "rgba(201,104,58,0.28)",
    borderCardHov: dark ? "rgba(201,104,58,0.5)"  : "rgba(201,104,58,0.6)",
    textPrimary:   dark ? "#fde0d0" : "#3a1508",
    textSecondary: dark ? "#f5b99a" : "#7a3618",
    textMuted:     dark ? "rgba(245,185,154,0.55)" : "rgba(90,42,18,0.65)",
    textAccent:    dark ? "#e8905e" : "#c9683a",
    accent:        "#c9683a",
    statValue:     dark ? "#e8905e" : "#c9683a",
    statLabel:     dark ? "rgba(245,185,154,0.6)" : "rgba(90,42,18,0.6)",
    btnText:       dark ? "#e8905e" : "#c9683a",
    shadowCard:    dark ? "0 4px 24px rgba(0,0,0,0.35)" : "0 4px 16px rgba(122,54,24,0.08)",
    shadowCardHov: dark ? "0 8px 32px rgba(201,104,58,0.12)" : "0 8px 24px rgba(201,104,58,0.1)",
  };
}

const stats = [
  { value: "10+", labelFr: "Technologies maîtrisées", labelEn: "Technologies mastered" },
  { value: "20+", labelFr: "Projets réalisés",        labelEn: "Projects completed" },
  { value: "2+",  labelFr: "Années d'expérience",     labelEn: "Years of experience" },
  { value: "100%",labelFr: "Motivation",               labelEn: "Motivation" },
];

export default function About() {
  const { t, i18n } = useTranslation();
  const dark     = useTheme();
  const tk       = getTokens(dark);
  const lang     = i18n.language;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!isMobile) setExpanded(false);
  }, [isMobile]);

  const fullText = t("about_desc");
  const paragraphs = fullText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const firstParagraph = paragraphs[0] || "";
  const hasMultipleParagraphs = paragraphs.length > 1;
  const displayedParagraphs = (!isMobile || expanded) ? paragraphs : [firstParagraph];

  return (
    <section
      id="about"
      className="relative min-h-screen overflow-hidden px-6 py-24 transition-colors duration-500"
      style={{ background: tk.bgPage, color: tk.textPrimary }}
    >
      <div className="max-w-7xl mx-auto">

        {/* ── Titre style 01 : barre latérale terracotta ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.3, 1] }}
          className="flex items-start gap-4 mb-16"
        >
          {/* Barre latérale */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              width: 4,
              height: 72,
              background: tk.accent,
              borderRadius: 2,
              flexShrink: 0,
              marginTop: 4,
              transformOrigin: "top",
            }}
          />
          {/* Contenu */}
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span
                className="text-xs font-semibold tracking-[3px] uppercase"
                style={{ color: tk.accent }}
              >
                {t("about.subtitle")}
              </span>
              <span style={{ fontSize: 11, color: tk.textMuted, opacity: 0.6 }}>
                / 01
              </span>
            </div>
            <h2
              className="font-black leading-tight"
              style={{
                fontSize: "clamp(22px, 4vw, 36px)",
                color: tk.textPrimary,
                margin: 0,
              }}
            >
              {t("about.titleBefore")}{" "}
              <span style={{ color: tk.accent }}>{t("about.highlight")}</span>
            </h2>
          </div>
        </motion.div>

        {/* ── Contenu : texte + stats ── */}
        <div className="grid md:grid-cols-2 gap-12 items-start pt-2">

          {/* Texte biographique */}
          <div className="text-left">
            <div className="max-w-xl mx-auto space-y-4" style={{ color: tk.textSecondary }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={expanded ? "full" : "truncated"}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {displayedParagraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className="whitespace-pre-line leading-relaxed text-base"
                      style={{ color: idx === 0 ? tk.textSecondary : tk.textMuted }}
                    >
                      {para}
                    </p>
                  ))}
                </motion.div>
              </AnimatePresence>

              {isMobile && hasMultipleParagraphs && (
                <button
                  onClick={() => setExpanded(prev => !prev)}
                  className="mt-4 text-sm font-semibold transition-colors"
                  style={{ color: tk.btnText }}
                >
                  {expanded ? t("about_voir_moins") : t("about_voir_plus")}
                </button>
              )}
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.labelFr}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={{
                  background: tk.bgCard,
                  border: `1px solid ${tk.borderCard}`,
                  boxShadow: tk.shadowCard,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = `1px solid ${tk.borderCardHov}`;
                  e.currentTarget.style.boxShadow = tk.shadowCardHov;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = `1px solid ${tk.borderCard}`;
                  e.currentTarget.style.boxShadow = tk.shadowCard;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="text-3xl font-black mb-2" style={{ color: tk.statValue }}>
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: tk.statLabel }}>
                  {lang === "en" ? stat.labelEn : stat.labelFr}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}