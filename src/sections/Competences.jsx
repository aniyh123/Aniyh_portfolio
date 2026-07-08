import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaCode,
  FaCogs,
  FaDatabase,
  FaCloud,
  FaTasks,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiPostgresql,
  SiMysql,
  SiKubernetes,
  SiExpress,
  SiGithub
} from "react-icons/si";

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
    borderCard: dark ? "rgba(201,104,58,0.22)" : "rgba(201,104,58,0.32)",
    shadowCard: dark ? "0 4px 24px rgba(0,0,0,0.4)" : "0 4px 16px rgba(122,54,24,0.08)",
    cardBg: dark ? "rgba(42,22,10,0.95)" : "rgba(255,248,244,0.95)",
    cardBgHov: dark ? "rgba(58,30,12,0.99)" : "rgba(253,245,240,0.99)",
  };
}

export default function SkillLaboratorySection() {
  const { t, i18n } = useTranslation();
  const dark = useTheme();
  const tk = getTokens(dark);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const categories = useMemo(() => [
    {
      id: "frontend",
      title: t("skills.categories.frontend.title"),
      icon: <FaCode className="text-2xl" />,
      description: t("skills.categories.frontend.description"),
      techs: ["React.js", "Vue.js", "Next.js", "React Native", "JavaScript", "TailwindCSS"],
    },
    {
      id: "backend",
      title: t("skills.categories.backend.title"),
      icon: <FaCogs className="text-2xl" />,
      description: t("skills.categories.backend.description"),
      techs: ["Node.js", "Express.js"],
    },
    {
      id: "database",
      title: t("skills.categories.database.title"),
      icon: <FaDatabase className="text-2xl" />,
      description: t("skills.categories.database.description"),
      techs: ["MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      id: "devops",
      title: t("skills.categories.devops.title"),
      icon: <FaCloud className="text-2xl" />,
      description: t("skills.categories.devops.description"),
      techs: ["Docker", "Git", "GitHub", "Kubernetes", "Postman"],
    },
    {
      id: "methodology",
      title: t("skills.categories.methodology.title"),
      icon: <FaTasks className="text-2xl" />,
      description: t("skills.categories.methodology.description"),
      techs: ["Merise", "Scrum", "UML"],
    },
  ], [i18n.language, t]);

  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories]);

  const techIcons = {
    "React.js": <FaReact className="text-terra-400 text-3xl" />,
    "Vue.js": <FaVuejs className="text-terra-400 text-3xl" />,
    "Next.js": <SiNextdotjs className={`${dark ? 'text-white' : 'text-slate-800'} text-3xl`} />,
    "React Native": <FaReact className="text-terra-400 text-3xl" />,
    "JavaScript": <SiJavascript className="text-yellow-400 text-3xl" />,
    "TailwindCSS": <SiTailwindcss className="text-terra-400 text-3xl" />,
    "Node.js": <FaNodeJs className="text-terra-400 text-3xl" />,
    "Express.js": <SiExpress className={`${dark ? 'text-gray-200' : 'text-gray-700'} text-3xl`} />,
    "MySQL": <SiMysql className="text-terra-400 text-3xl" />,
    "PostgreSQL": <SiPostgresql className="text-terra-400 text-3xl" />,
    "MongoDB": <SiExpress className="text-terra-400 text-3xl" />,
    Docker: <FaDocker className="text-terra-400 text-3xl" />,
    Kubernetes: <SiKubernetes className="text-terra-400 text-3xl" />,
    Git: <FaGitAlt className="text-orange-400 text-3xl" />,
    GitHub: <SiGithub className={`${dark ? 'text-white' : 'text-slate-800'} text-3xl`} />,
    Postman: <FaCode className="text-orange-400 text-3xl" />,
    Merise: <FaDatabase className="text-purple-400 text-3xl" />,
    Scrum: <FaTasks className="text-green-400 text-3xl" />,
    UML: <FaCode className="text-terra-400 text-3xl" />,
  };

  const MobileView = () => (
    <div className="lg:hidden space-y-3">
      {categories.map((category) => {
        const isExpanded = expandedMobile === category.id;
        return (
          <motion.div
            key={category.id}
            className="rounded-2xl overflow-hidden transition-all duration-300"
            style={{
              background: tk.cardBg,
              border: `1px solid ${isExpanded ? tk.accent : tk.borderCard}`,
              boxShadow: isExpanded ? `0 0 30px ${tk.accentGlow}` : tk.shadowCard,
            }}
          >
            <button
              onClick={() => setExpandedMobile(isExpanded ? null : category.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl text-xl" style={{ color: tk.accent }}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: tk.textPrimary }}>
                    {category.title}
                  </h3>
                  <p className="text-xs" style={{ color: tk.textMuted }}>
                    {category.techs.length} technologies
                  </p>
                </div>
              </div>
              <div style={{ color: tk.textMuted }}>
                {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                <p className="text-sm mb-3" style={{ color: tk.textSecondary }}>
                  {category.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {category.techs.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 p-2 rounded-xl"
                      style={{
                        background: dark ? "rgba(201,104,58,0.08)" : "rgba(201,104,58,0.05)",
                      }}
                    >
                      <div className="text-xl">{techIcons[tech]}</div>
                      <span className="text-sm" style={{ color: tk.textSecondary }}>
                        {tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );

  const DesktopView = () => (
    <div className="hidden lg:grid gap-6 lg:grid-cols-[320px_1fr]">
      <div className="space-y-3">
        {categories.map((category) => (
          <button
            onClick={() => setActiveCategory(category)}
            key={category.id}
            className={`group relative w-full overflow-hidden rounded-2xl p-4 text-left backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${
              activeCategory?.id === category.id
                ? "border-2 shadow-[0_0_40px_rgba(201,104,58,0.25)]"
                : "border hover:border-terra-400/40"
            }`}
            style={{
              borderColor: activeCategory?.id === category.id ? tk.accent : tk.borderCard,
              background: activeCategory?.id === category.id 
                ? dark ? "rgba(201,104,58,0.12)" : "rgba(201,104,58,0.06)"
                : dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
            }}
          >
            <div className="relative flex items-center gap-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-xl"
                style={{ color: activeCategory?.id === category.id ? tk.accent : tk.textMuted }}
              >
                {category.icon}
              </div>
              <div>
                <h3 className="font-bold" style={{ color: activeCategory?.id === category.id ? tk.textPrimary : tk.textMuted }}>
                  {category.title}
                </h3>
                <p className="text-xs" style={{ color: tk.textMuted }}>
                  {category.techs.length} technologies
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div
        className="relative rounded-2xl p-6 backdrop-blur-2xl"
        style={{
          border: `1px solid ${tk.borderCard}`,
          background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        }}
      >
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2" style={{ color: tk.textPrimary }}>
                {activeCategory.title}
              </h3>
              <p className="text-sm" style={{ color: tk.textSecondary }}>
                {activeCategory.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {activeCategory.techs.map((tech) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02]"
                  style={{
                    background: dark ? "rgba(201,104,58,0.08)" : "rgba(201,104,58,0.04)",
                    border: `1px solid ${tk.borderCard}`,
                  }}
                >
                  <div className="text-2xl">{techIcons[tech]}</div>
                  <span className="font-medium" style={{ color: tk.textPrimary }}>
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 pt-4 flex gap-6" style={{ borderTop: `1px solid ${tk.borderCard}` }}>
              <div>
                <p className="text-xs" style={{ color: tk.textMuted }}>Technologies</p>
                <p className="text-lg font-bold" style={{ color: tk.accent }}>
                  {activeCategory.techs.length}
                </p>
              </div>
              <div>
                <p className="text-xs" style={{ color: tk.textMuted }}>Catégorie</p>
                <p className="text-lg font-bold" style={{ color: tk.textPrimary }}>
                  {activeCategory.title}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  return (
    <section
      id="competences"
      className="relative min-h-screen overflow-hidden px-6 py-24 transition-colors duration-500"
      style={{ background: tk.bgPage, color: tk.textPrimary }}
    >
      <div className="relative mx-auto max-w-7xl">
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
                {t('skills.subtitle')}
              </span>
              <span style={{ fontSize: 11, color: tk.textMuted, opacity: 0.6 }}>
                / 02
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
              {t('skills.titleBefore')}{" "}
              <span style={{ color: tk.accent }}>{t('skills.highlight')}</span>{" "}
              {t('skills.titleAfter')}
            </h2>
          </div>
        </motion.div>

        <DesktopView />
        <MobileView />
      </div>
    </section>
  );
}