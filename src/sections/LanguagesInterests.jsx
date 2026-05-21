import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import malagasy from "../assets/a1.png";
import francais from "../assets/a2.png";
import anglais from "../assets/a3.png";
import photo from "../assets/photo1.png";

const languages = [
  {
    code: "mg",
    nameKey: "malagasy",
    flagUrl: malagasy,
    level: 99,
  },
  {
    code: "fr",
    nameKey: "french",
    flagUrl: francais,
    level: 80,
  },
  {
    code: "en",
    nameKey: "english",
    flagUrl: anglais,
    level: 50,
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

  return (
    <section
      id="languages-interests"
     className="relative min-h-screen overflow-hidden bg-white px-6 py-24 text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">

      <div className="max-w-6xl mx-auto">
        <Reveal>
         <div className="mb-12 text-center">
  <div className="flex items-center justify-center gap-3 mb-4">
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <span className="text-xs font-semibold tracking-[4px] uppercase text-blue-400">
      {t("lang_interests_subtitle")}
    </span>
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
      <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  </div>
  <h2 className="mx-auto max-w-2xl text-2xl font-black leading-tight md:text-4xl">
    <span className="text-slate-900 dark:text-white">
      {t("lang_interests_title_part1")}
    </span>{" "}
    <span className="text-blue-500">
      {t("lang_interests_title_part2")}
    </span>
  </h2>
</div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* COLONNE GAUCHE - LANGUES (pas d'image de fond) */}
          <Reveal>
            <div className="bg-gray-50 dark:bg-[#1A1A1E] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-blue-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> {t("languages_title", "Langues")}
              </h3>
              <div className="space-y-6">
                {languages.map((lang, idx) => (
                  <motion.div
                    key={lang.code}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={lang.flagUrl}
                        alt={`Drapeau ${t(lang.nameKey)}`}
                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                      />
                      <span className="font-semibold text-lg">{t(lang.nameKey)}</span>
                      <span className="ml-auto text-sm text-gray-500">{lang.level}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        viewport={{ once: true }}
                       className="h-full rounded-full bg-gradient-to-r from-blue-800 to-blue-600"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* COLONNE DROITE - LOISIRS AVEC IMAGE DE FOND */}
          <Reveal>
            <div
              className="relative rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all bg-cover bg-center bg-no-repeat overflow-hidden"
              style={{ backgroundImage: `url(${photo})` }}
            >
              {/* Overlay pour lisibilité */}
              <div className="absolute inset-0 bg-white/70 dark:bg-[#1A1A1E]/80 backdrop-blur-sm" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-blue-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> {t("interests_title", "Centres d'intérêt")}
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
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600/20 to-blue-400/20 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0">
                        <div className="w-6 h-6">{interest.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{t(interest.nameKey)}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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