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
      className="py-20 px-[6%] bg-white text-black dark:bg-[#0B0B0F] dark:text-white transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs tracking-[4px] uppercase font-semibold mb-3 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t("lang_interests_subtitle", "À propos de moi")}
            </p>
              <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">
              {t("lang_interests_title", "Langues & Loisirs")}
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* COLONNE GAUCHE - LANGUES (pas d'image de fond) */}
          <Reveal>
            <div className="bg-gray-50 dark:bg-[#1A1A1E] rounded-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-3xl">🗣️</span> {t("languages_title", "Langues")}
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
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
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
                  <span className="text-3xl">✨</span> {t("interests_title", "Centres d'intérêt")}
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
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 hover:border-purple-500/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400 shrink-0">
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