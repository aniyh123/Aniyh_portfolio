import { useTranslation, Trans } from "react-i18next";

export default function About() {
  const { t } = useTranslation();

  const stats = [
    { value: "10+", label: "Technologies maîtrisées" },
    { value: "20+", label: "Projets terminé" },
    { value: "2+", label: "Années d'expérience" },
    { value: "100%", label: "Motivation" }
  ];

  return (
    <section
      id="about"
      className="py-20 px-[6%] bg-white text-black dark:bg-[#0B0B0F] dark:text-white transition-colors duration-500"
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-black dark:text-white">
        {t("about_title")}
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Partie gauche - identique à votre code qui fonctionne */}
        <div className="text-left">
         <p className="whitespace-pre-line max-w-xl mx-auto text-gray-700 dark:text-gray-300">
            <Trans i18nKey="about_desc">
              {t("about_desc")}
            </Trans>
          </p>
        </div>

        {/* Partie droite - cartes statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-100 dark:bg-[#1A1A1E] rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-800"
            >
              <div className="text-3xl font-black text-[#00E5A0] mb-2">
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