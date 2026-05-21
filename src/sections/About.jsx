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

export default function About() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!isMobile) setExpanded(false);
  }, [isMobile]);

  const fullText = t("about_desc");
  const paragraphs = fullText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const firstParagraph = paragraphs[0] || "";
  const hasMultipleParagraphs = paragraphs.length > 1;

  const toggleExpand = () => setExpanded(prev => !prev);

  const displayedParagraphs = (!isMobile || expanded) ? paragraphs : [firstParagraph];

  const stats = [
    { value: "10+", label: "Technologies maîtrisées" },
    { value: "20+", label: "Projets terminé" },
    { value: "2+", label: "Années d'expérience" },
    { value: "100%", label: "Motivation" }
  ];

  return (
    <section
      id="about"
    className="relative min-h-screen overflow-hidden bg-white px-6 py-24 text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">

       <div className="mb-16 text-center">
  <div className="flex items-center justify-center gap-3 mb-4">
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <span className="text-xs font-semibold tracking-[4px] uppercase text-blue-400">
      {t("about.subtitle")}
    </span>
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>
  <h2 className="mx-auto max-w-2xl text-2xl font-black leading-tight md:text-4xl">
    {t("about.titleBefore")} <span className="text-blue-500">{t("about.highlight")}</span> 
  </h2>
</div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start pt-2">
        <div className="text-left">
          <div className="max-w-xl mx-auto text-gray-700 dark:text-gray-300 space-y-4">
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
                  <p key={idx} className="whitespace-pre-line">
                    {para}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>

            {isMobile && hasMultipleParagraphs && (
              <button
                onClick={toggleExpand}
                className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors"
              >
                {expanded ? t("about_voir_moins") : t("about_voir_plus")}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-100 dark:bg-[#1A1A1E] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-800"
            >
              <div className="text-3xl font-black text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}