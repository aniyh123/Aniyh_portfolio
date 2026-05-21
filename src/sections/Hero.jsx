import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaProjectDiagram } from "react-icons/fa";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiTailwindcss,
  SiJavascript,
  SiGit,
  SiGithub,
} from "react-icons/si";
import heroPhoto from "../assets/aniyh1.png";

export default function Hero() {
  const { t, i18n } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({ pseudo: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const WEB3FORMS_KEY = "abebf0c8-5d10-4973-835d-a1519ce5d330";
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (!contactSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsContactVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        const hash = target.getAttribute('href');
        if (hash && hash !== "#") {
          e.preventDefault();
          const element = document.querySelector(hash);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const quickQuestions = [
    { textKey: "quick_question_recherches", replyKey: "quick_reply_recherches" },
    { textKey: "quick_question_disponibilites", replyKey: "quick_reply_disponibilites" },
    { textKey: "quick_question_parcours", replyKey: "quick_reply_parcours" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pseudo.trim()) newErrors.pseudo = t("pseudo_required");
    if (!formData.email.trim()) newErrors.email = t("email_required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("email_invalid");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = async () => {
    if (!validateForm()) return;
    setIsSending(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.pseudo,
          email: formData.email,
          phone: formData.whatsapp || "Non renseigné",
          message: `${formData.pseudo} a laissé ses coordonnées.\nWhatsApp: ${formData.whatsapp || "Non renseigné"}`,
          subject: `Nouveau message de ${formData.pseudo}`,
          replyto: formData.email,
          redirect: false,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setStep("chat");
        setMessages([
          {
            id: 1,
            text: t("welcome_message", { pseudo: formData.pseudo }),
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      } else {
        alert("Erreur d'envoi : " + (data.message || "Réessayez"));
      }
    } catch (error) {
      console.error(error);
      alert("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const messageText = inputValue;
    setInputValue("");
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.pseudo,
          email: formData.email,
          phone: formData.whatsapp || "Non renseigné",
          message: messageText,
          subject: `Message de ${formData.pseudo} via le chat`,
        }),
      });
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: t("reply_thank_you", { email: formData.email }),
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: t("reply_error", { email: formData.email }),
            isBot: true,
            timestamp: new Date(),
          },
        ]);
      }, 500);
    }
  };

  const handleQuickQuestion = (questionTextKey, replyKey) => {
    const questionText = t(questionTextKey);
    const replyText = t(replyKey, { pseudo: formData.pseudo });
    const userMessage = {
      id: Date.now(),
      text: questionText,
      isBot: false,
      timestamp: new Date(),
    };
    const botMessage = {
      id: Date.now() + 1,
      text: replyText,
      isBot: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage, botMessage]);
  };


  const fullTitle = t("hero_title");
  let devPart, stackPart;
  const lang = i18n.language;
  if (lang === "fr") {
   
    const spaceIdx = fullTitle.indexOf(' ');
    devPart = fullTitle.substring(0, spaceIdx);
    stackPart = fullTitle.substring(spaceIdx + 1);
  } else {

    const lastSpaceIdx = fullTitle.lastIndexOf(' ');
    devPart = fullTitle.substring(lastSpaceIdx + 1);   
    stackPart = fullTitle.substring(0, lastSpaceIdx); 
  }
  const devLetters = devPart.split("");
  const stackLetters = stackPart.split("");

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-6 py-24 text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">
   {!isContactVisible && (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 50 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay: 0.6, type: "spring" }}
    className="fixed bottom-4 right-4 z-20"
  >
    <div
      className={`bg-white dark:bg-[#1A1A1E] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ${
        chatOpen ? 'w-[260px] sm:w-[300px]' : 'w-[48px] sm:w-[56px]'
      }`}
    >
 
      <div
        className="bg-gradient-to-r from-blue-800 to-blue-600 p-2 cursor-pointer flex items-center justify-between"
        onClick={() => setChatOpen(!chatOpen)}
      >
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <FaEnvelope size={16} color="blue" />
          </div>
          {chatOpen && (
            <div>
              <p className="text-white font-bold text-xs">{t("contact_me") || "Contact"}</p>
              <p className="text-[8px] text-white/80">{step === "form" ? t("leave_coords") : formData.pseudo}</p>
            </div>
          )}
        </div>
        {chatOpen && <span className="text-white text-xs">{chatOpen ? "▼" : "▲"}</span>}
      </div>


      {chatOpen && (
        <div className="flex flex-col h-[320px] sm:h-[360px]">
          {step === "form" ? (
            <div className="flex-1 p-3 space-y-2">
              <input
                type="text"
                placeholder={t("pseudo_placeholder")}
                value={formData.pseudo}
                onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-[#2A2A2E] border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
              />
              {errors.pseudo && <p className="text-red-500 text-[9px]">{errors.pseudo}</p>}
              <input
                type="email"
                placeholder={t("email_placeholder")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-[#2A2A2E] border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
              />
              {errors.email && <p className="text-red-500 text-[9px]">{errors.email}</p>}
              <input
                type="tel"
                placeholder={t("whatsapp_placeholder")}
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full p-2 rounded-lg bg-gray-100 dark:bg-[#2A2A2E] border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-xs"
              />
              <button
                onClick={handleSubmitForm}
                disabled={isSending}
                className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold py-2 rounded-lg disabled:opacity-50 text-xs"
              >
                {isSending ? t("sending") : t("start_button")}
              </button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[85%] p-1.5 rounded-lg text-[11px] ${
                        msg.isBot
                          ? "bg-gray-100 dark:bg-[#2A2A2E]"
                          : "bg-gradient-to-r from-blue-800 to-blue-600 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="px-2 pb-1">
                <p className="text-[8px] text-gray-400">⚡ {t("quick_questions_label") || "Questions fréquentes :"}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q.textKey, q.replyKey)}
                      className="text-[9px] bg-gray-100 dark:bg-[#2A2A2E] px-1.5 py-0.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                    >
                      {t(q.textKey)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-2 border-t border-gray-200 dark:border-gray-800 flex gap-1.5">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={t("message_placeholder") || "Votre message..."}
                  className="flex-1 text-[11px] p-1.5 rounded-lg bg-gray-100 dark:bg-[#2A2A2E] border border-gray-300 dark:border-gray-700 focus:border-blue-500 outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-800 to-blue-600 text-white px-2 rounded-lg text-xs font-medium"
                >
                  {t("send_button") || "Envoyer"}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  </motion.div>
)}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center lg:justify-items-start">
    <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono mb-6"
            >
              {t("hero_subtitle") || "const developer = { fullstack: true }"}
            </motion.div>

    <motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 flex flex-wrap justify-center lg:justify-start gap-x-3"
>
  {lang === "fr" ? (
    <>
      <span className="inline-block whitespace-nowrap">
        {devLetters.map((letter, idx) => (
          <motion.span
            key={`dev-${idx}`}
            animate={{ color: ["#2563eb", "#1e293b", "#2563eb"] }}
            transition={{
              duration: 2.5,
              delay: (devLetters.length - 1 - idx) * 0.12,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
      <span className="inline-block whitespace-nowrap">
        {stackLetters.map((letter, idx) => (
          <motion.span
            key={`stack-${idx}`}
            animate={{ color: ["#1e293b", "#2563eb", "#1e293b"] }}
            transition={{
              duration: 2.5,
              delay: idx * 0.12,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
    </>
  ) : (
    <>
      <span className="inline-block whitespace-nowrap">
        {stackLetters.map((letter, idx) => (
          <motion.span
            key={`stack-${idx}`}
            animate={{ color: ["#1e293b", "#2563eb", "#1e293b"] }}
            transition={{
              duration: 2.5,
              delay: idx * 0.12,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
      <span className="inline-block whitespace-nowrap">
        {devLetters.map((letter, idx) => (
          <motion.span
            key={`dev-${idx}`}
            animate={{ color: ["#2563eb", "#1e293b", "#2563eb"] }}
            transition={{
              duration: 2.5,
              delay: (devLetters.length - 1 - idx) * 0.12,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </span>
    </>
  )}
</motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-700 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 text-base md:text-lg leading-relaxed mb-8"
            >
              {t("hero_desc")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold overflow-hidden shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 group-hover:w-full"></span>
                <span className="relative flex items-center gap-2">
                  {t("contact_title") || "Contact Me"}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>

              <a
                href="#projects"
                className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <FaProjectDiagram className="text-blue-400 text-xl" />
                <div>
                  <div className="text-sm font-medium">{t("projects_title") || "View Projects"}</div>
                </div>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative flex flex-col items-center"
          >
            <div className="relative w-80 h-80 md:w-[26rem] md:h-[26rem]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-20 blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/50 animate-spin-slow"></div>
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={heroPhoto}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover border-4 border-white/20 shadow-2xl shadow-blue-500/20"
                />
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-xs text-center text-sm italic text-slate-600 dark:text-slate-300"
            >
              “{t("hero_quote")}”
            </motion.p>
          </motion.div>
        </div>
      </div>

      
    </section>
  );
}