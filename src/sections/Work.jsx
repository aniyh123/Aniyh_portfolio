import { useTranslation } from "react-i18next";
import Reveal from "../components/Reveal";

export default function Work() {
  const { t } = useTranslation();

  const steps = [
    t("analyse"),
    t("design"),
    t("developpement"),
    t("optimisation"),
  ];

  return (
    <section className="p-20 text-center bg-white text-black dark:bg-[#0B0B0F] dark:text-white transition-colors duration-500">
      <Reveal>
        <h2 className="text-4xl font-bold mb-10">{t("work_title")}</h2>
      </Reveal>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <Reveal key={i}>
            <div className="p-6 bg-black/5 dark:bg-white/5 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 transition duration-300">
              {step}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}