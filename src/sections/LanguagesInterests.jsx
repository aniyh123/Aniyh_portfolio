import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Reveal from "../components/Reveal";
import malagasy from "../assets/a1.png";
import francais from "../assets/a2.png";
import anglais from "../assets/a3.png";
import photo from "../assets/photo1.png";

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
    bgPage: dark ? "#1a0e08" : "#fff8f4",
    textPrimary: dark ? "#fde0d0" : "#3a1508",
    textSecondary: dark ? "#f5b99a" : "#7a3618",
    textMuted: dark ? "rgba(245,185,154,0.5)" : "rgba(122,54,24,0.55)",
    textAccent: dark ? "#e8905e" : "#c9683a",
    accent: "#c9683a",
    accentLight: "#e8905e",
    accentGlow: dark ? "rgba(201,104,58,0.25)" : "rgba(201,104,58,0.15)",
    cardBg: dark ? "rgba(42,22,10,0.98)" : "rgba(255,248,244,0.98)",
    cardBorder: dark ? "rgba(201,104,58,0.22)" : "rgba(201,104,58,0.32)",
    cardShadow: dark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 16px rgba(122,54,24,0.08)",
    interestBg: dark ? "rgba(42,22,10,0.5)" : "rgba(255,248,244,0.5)",
    interestBorder: dark ? "rgba(201,104,58,0.3)" : "rgba(201,104,58,0.25)",
    interestIconBg: dark ? "rgba(201,104,58,0.2)" : "rgba(201,104,58,0.15)",
    interestIconColor: dark ? "#e8905e" : "#c9683a",
    overlay: dark ? "rgba(26,14,8,0.85)" : "rgba(255,248,244,0.85)",
    levelBadgeBg: dark ? "rgba(201,104,58,0.2)" : "rgba(201,104,58,0.1)",
    levelBadgeText: dark ? "#e8905e" : "#c9683a",
  };
}

// Icônes SVG pour les langues
const LanguageIcon = ({ type }) => {
  if (type === "maternal") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
        <path d="M12 2v18" />
      </svg>
    );
  }
  if (type === "fluent") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    );
  }
  if (type === "technical") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 22v-4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    );
  }
  return null;
};

const languages = [
  {
    code: "mg",
    nameKey: "malagasy",
    flagUrl: malagasy,
    levelKey: "level_maternal",
    descriptionKey: "lang_maternal_desc",
    iconType: "maternal",
  },
  {
    code: "fr",
    nameKey: "french",
    flagUrl: francais,
    levelKey: "level_fluent",
    descriptionKey: "lang_fluent_desc",
    iconType: "fluent",
  },
  {
    code: "en",
    nameKey: "english",
    flagUrl: anglais,
    levelKey: "level_technical",
    descriptionKey: "lang_technical_desc",
    iconType: "technical",
  },
];

const interests = [
  {
    id: "reading",
    nameKey: "reading",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    descriptionKey: "reading_desc",
  },
  {
    id: "dancing",
    nameKey: "dancing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="7" r="3" />
        <path d="M5 14s1.5-2 7-2 7 2 7 2" />
        <path d="M12 11v10" />
      </svg>
    ),
    descriptionKey: "dancing_desc",
  },
  {
    id: "traveling",
    nameKey: "traveling",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    descriptionKey: "traveling_desc",
  },
];

const LanguagesInterests = () => {
  const { t } = useTranslation();
  const dark = useTheme();
  const tk = getTokens(dark);

  return (
    <section
      id="languages-interests"
      className="relative min-h-screen overflow-hidden px-6 py-24 transition-colors duration-500"
      style={{ background: tk.bgPage, color: tk.textPrimary }}
    >
      <div className="max-w-6xl mx-auto">
        {/* ── Nouveau titre style barre latérale ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.3, 1] }}
          className="flex items-start gap-4 mb-16"
        >
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
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span
                className="text-xs font-semibold tracking-[3px] uppercase"
                style={{ color: tk.accent }}
              >
                {t("lang_interests_subtitle")}
              </span>
              <span style={{ fontSize: 11, color: tk.textMuted, opacity: 0.6 }}>
                / 05
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
              {t("lang_interests_title_part1")}{" "}
              <span style={{ color: tk.accent }}>
                {t("lang_interests_title_part2")}
              </span>
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* COLONNE GAUCHE - LANGUES */}
          <Reveal>
            <div
              className="rounded-2xl p-6 md:p-8 transition-all"
              style={{
                background: tk.cardBg,
                border: `1px solid ${tk.cardBorder}`,
                boxShadow: tk.cardShadow,
              }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: tk.textPrimary }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" style={{ color: tk.textAccent }}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg> 
                {t("languages_title", "Langues")}
              </h3>
              <div className="space-y-4">
                {languages.map((lang, idx) => (
                  <motion.div
                    key={lang.code}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-4 p-3 rounded-xl transition-all hover:scale-[1.02]"
                      style={{
                        background: dark ? "rgba(201,104,58,0.05)" : "rgba(201,104,58,0.03)",
                        border: `1px solid ${tk.cardBorder}`,
                      }}
                    >
                      <img
                        src={lang.flagUrl}
                        alt={`Drapeau ${t(lang.nameKey)}`}
                        className="w-10 h-7 object-cover rounded-md shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold" style={{ color: tk.textPrimary }}>
                            {t(lang.nameKey)}
                          </span>
                          <span style={{ color: lang.code === "mg" ? tk.accent : tk.textMuted }}>
                            <LanguageIcon type={lang.iconType} />
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-sm" style={{ color: tk.textSecondary }}>
                            {t(lang.descriptionKey)}
                          </span>
                          <span
                            className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{
                              background: tk.levelBadgeBg,
                              color: tk.levelBadgeText,
                              border: `1px solid ${tk.cardBorder}`,
                            }}
                          >
                            {t(lang.levelKey)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* COLONNE DROITE - LOISIRS AVEC IMAGE DE FOND */}
          <Reveal>
            <div
              className="relative rounded-2xl p-6 md:p-8 transition-all bg-cover bg-center bg-no-repeat overflow-hidden"
              style={{ 
                backgroundImage: `url(${photo})`,
                border: `1px solid ${tk.cardBorder}`,
                boxShadow: tk.cardShadow,
              }}
            >
              <div
                className="absolute inset-0 backdrop-blur-sm"
                style={{ background: tk.overlay }}
              />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold flex items-center gap-2" style={{ color: tk.textPrimary }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" style={{ color: tk.textAccent }}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg> 
                  {t("interests_title", "Centres d'intérêt")}
                </h3>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {interests.map((interest, idx) => (
                    <motion.div
                      key={interest.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="flex items-start gap-4 p-4 rounded-xl transition-all"
                      style={{
                        background: tk.interestBg,
                        border: `1px solid ${tk.interestBorder}`,
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          background: tk.interestIconBg,
                          color: tk.interestIconColor,
                        }}
                      >
                        <div className="w-6 h-6">{interest.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg" style={{ color: tk.textPrimary }}>
                          {t(interest.nameKey)}
                        </h4>
                        <p className="text-sm mt-1" style={{ color: tk.textMuted }}>
                          {t(interest.descriptionKey)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LanguagesInterests;