import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FaReact,
  FaVuejs,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaFigma,
  FaCode,
  FaCogs,
  FaDatabase,
  FaCloud,
  FaTasks,
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

export default function SkillLaboratorySection() {
  const { t, i18n } = useTranslation();
  const categories = useMemo(() => [
    {
      title: t("skills.categories.frontend.title"),
      icon: <FaCode className="text-2xl" />,
      color: "from-blue-500 to-cyan-400",
      description: t("skills.categories.frontend.description"),
      simulation: t("skills.simulations.frontend"),
      quoteKey: "frontend",
      techs: [
        "React.js",
        "Vue.js",
        "Next.js",
        "React Native",
        "JavaScript",
        "TailwindCSS",
      ],
    },
    {
      title: t("skills.categories.backend.title"),
      icon: <FaCogs className="text-2xl" />,
      color: "from-emerald-500 to-teal-400",
      description: t("skills.categories.backend.description"),
      simulation: t("skills.simulations.backend"),
      quoteKey: "backend",
      techs: ["Node.js", "Express.js"],
    },
    {
      title: t("skills.categories.database.title"),
      icon: <FaDatabase className="text-2xl" />,
      color: "from-orange-500 to-amber-400",
      description: t("skills.categories.database.description"),
      simulation: t("skills.simulations.database"),
      quoteKey: "database",
      techs: ["MySQL", "PostgreSQL","MongoDB"],
    },
    {
      title: t("skills.categories.devops.title"),
      icon: <FaCloud className="text-2xl" />,
      color: "from-violet-500 to-fuchsia-400",
      description: t("skills.categories.devops.description"),
      simulation: t("skills.simulations.devops"),
      quoteKey: "devops",
      techs: ["Docker", "Git", "GitHub", "Kubernetes", "Postman"],
    },
    {
      title: t("skills.categories.methodology.title"),
      icon: <FaTasks className="text-2xl" />,
      color: "from-yellow-500 to-orange-400",
      description: t("skills.categories.methodology.description"),
      simulation: t("skills.simulations.methodology"),
      quoteKey: "methodology",
      techs: ["Merise", "Scrum", "UML"],
    },
  ], [i18n.language, t]);

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showSimulation, setShowSimulation] = useState(false);

  const techIcons = {
    "React.js": <FaReact className="text-cyan-400 text-4xl" />,
    "Vue.js": <FaVuejs className="text-emerald-400 text-4xl" />,
    "Next.js": <SiNextdotjs className="dark:text-white text-slate-800 text-4xl" />,
    "React Native": <FaReact className="text-blue-400 text-4xl" />,
    "JavaScript": <SiJavascript className="text-yellow-400 text-4xl" />,
    "TailwindCSS": <SiTailwindcss className="text-cyan-400 text-4xl" />,
    "Node.js": <FaNodeJs className="text-emerald-400 text-4xl" />,
    "Express.js": <SiExpress className="dark:text-gray-200 text-gray-700 text-4xl" />,
    "MySQL": <SiMysql className="text-blue-400 text-4xl" />,
    "PostgreSQL": <SiPostgresql className="text-sky-400 text-4xl" />,
    "MongoDB": <SiExpress className="text-green-400 text-4xl" />,
    Docker: <FaDocker className="text-blue-400 text-4xl" />,
    Kubernetes: <SiKubernetes className="text-blue-500 text-4xl" />,
    Git: <FaGitAlt className="text-orange-400 text-4xl" />,
    GitHub: <SiGithub className="dark:text-white text-slate-800 text-4xl" />,
    Postman: <FaCode className="text-orange-400 text-4xl" />,
    Figma: <FaFigma className="text-pink-400 text-4xl" />,
    Merise: <FaDatabase className="text-purple-400 text-4xl" />,
    Scrum: <FaTasks className="text-green-400 text-4xl" />,
    UML: <FaCode className="text-blue-400 text-4xl" />,
  };

  const techLevels = {
    "React.js": "85%",
    "Vue.js": "75%",
    "Next.js": "50%",
    "React Native": "70%",
    "JavaScript": "85%",
    "TailwindCSS": "85%",
    "Node.js": "85%",
    "Express.js": "85%",
    "MySQL": "90%",
    "PostgreSQL": "90%",
    "MongoDB": "90%",
    "Docker": "00%",
    "Kubernetes": "80%",
    "Git": "87%",
    "GitHub": "87%",
    "Postman": "80%",
    "Merise": "90%",
    "Scrum": "80%",
    "UML": "80%",
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-6 py-24 text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
             <div className="flex items-center justify-center gap-3 mb-4">
           <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
         <span className="text-xs font-semibold tracking-[4px] uppercase text-blue-400">
            {t('skills.subtitle')}
          </span>
 <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M1 7h3M10 7h3M7 1v3M7 10v3" stroke="#2dd4ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            </div>
          <h2 className="mx-auto max-w-2xl text-2xl font-black leading-tight md:text-4xl text-slate-800 dark:text-white">
            {t('skills.titleBefore')} <span className="text-blue-500">{t('skills.highlight')}</span> {t('skills.titleAfter')}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            {t('skills.description')}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px]">
        
          <div className="space-y-4">
            {categories.map((category, index) => (
              <button
                onClick={() => setActiveCategory(category)}
                key={index}
                className={`group relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 p-5 text-left backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] dark:border-white/10 dark:bg-white/5 hover:dark:bg-blue-500/10 hover:border-blue-500/40 ${
                  activeCategory.title === category.title
                    ? "border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.25)] dark:bg-blue-500/10"
                    : "hover:bg-blue-50 dark:hover:bg-blue-500/10"
                }`}
              >
                <div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r ${category.color}`}
                  style={{ filter: "blur(120px)" }}
                />

                <div className="relative flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold ${category.color}`}
                  >
                    {category.icon}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold">{category.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {category.techs.length} technologies
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

        
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-8 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)] opacity-0 dark:opacity-100" />

            <div className="relative z-10 flex items-start justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_20px_#3b82f6]" />
                  <h3 className="text-2xl font-black uppercase tracking-wide text-blue-400">
                    {activeCategory.title}
                  </h3>
                </div>

                <p className="max-w-lg text-slate-500 dark:text-slate-400">
                  {activeCategory.description}
                </p>
              </div>

            </div>

            <div className="relative mt-16 flex items-center justify-center">
              <div className="absolute h-[420px] w-[420px] rounded-full border border-blue-500/20" />
              <div className="absolute h-[520px] w-[520px] rounded-full border border-blue-500/10" />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="relative z-10 flex h-[300px] w-[300px] flex-col justify-center rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_0_80px_rgba(59,130,246,0.25)] backdrop-blur-2xl dark:border-white/10 dark:bg-[#081120]"
              >
                <div className="text-center">
                  <div className="mb-6 text-6xl text-blue-500">"</div>
                  <p className="text-lg italic leading-relaxed">
                    {t(`skills.quotes.${activeCategory.quoteKey}`)}
                  </p>
                  <p className="mt-6 text-sm font-semibold text-blue-400">
                    — {t('skills.author')}
                  </p>
                </div>
              </motion.div>

              <svg className="absolute inset-0 h-full w-full">
                <line x1="50%" y1="15%" x2="50%" y2="32%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="75%" y1="32%" x2="63%" y2="42%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="80%" y1="72%" x2="63%" y2="60%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" />
                <line x1="22%" y1="75%" x2="37%" y2="60%" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6 6" />
              </svg>

              {activeCategory.techs.slice(0, 4).map((tech, index) => {
                const positions = [
                  "-top-10 left-1/4 -translate-x-1/2",
                  "right-8 top-10",
                  "bottom-10 right-4",
                  "bottom-0 left-10",
                ];

                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute ${positions[index]} flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-200 bg-slate-100 text-center shadow-[0_0_40px_rgba(59,130,246,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1220]`}
                  >
                    <div>
                      {techIcons[tech] || <div className="text-3xl">✦</div>}
                      <p className="mt-1 text-xs font-semibold">{tech}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-bold uppercase tracking-wide text-slate-300">
              {t('skills.masteredTech')}
            </h3>

            <div className="mt-8 space-y-6">
              {activeCategory.techs.map((tech, index) => {
                const level = techLevels[tech] || `${75 + index * 5}%`;

                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div>{techIcons[tech]}</div>
                        <span>{tech}</span>
                      </div>
                      <span className="text-blue-400">{level}</span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: level }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}