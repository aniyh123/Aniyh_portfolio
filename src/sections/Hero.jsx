import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { FaEnvelope, FaProjectDiagram } from "react-icons/fa";
import heroPhoto from "../assets/Aniyh.jpeg";

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
    bgPage:         dark ? "#1a0e08"   : "#fff8f4",
    bgNav:          dark ? "#0e0704"   : "#fff8f4",
    bgCard:         dark ? "rgba(42,22,10,0.98)" : "rgba(255,248,244,0.98)",
    bgBadge:        dark ? "rgba(201,104,58,0.15)" : "#fde0d0",
    accent:         "#c9683a",
    accentLight:    "#e8905e",
    accentGlow:     dark ? "rgba(201,104,58,0.25)" : "rgba(201,104,58,0.15)",
    textPrimary:    dark ? "#fde0d0" : "#3a1508",
    textSecondary:  dark ? "#f5b99a" : "#7a3618",
    textMuted:      dark ? "rgba(245,185,154,0.5)" : "rgba(122,54,24,0.55)",
    textAccent:     dark ? "#e8905e" : "#c9683a",
    borderBadge:    dark ? "rgba(201,104,58,0.4)"  : "rgba(201,104,58,0.5)",
    borderNav:      dark ? "rgba(201,104,58,0.12)" : "rgba(201,104,58,0.18)",
    photoBorder:    "#c9683a",
    photoBg:        dark ? "radial-gradient(circle,#5c2b12,#1a0e08)"
                         : "linear-gradient(135deg,#fde0d0,#f5b99a)",
    shadowPhoto:    dark ? "0 0 40px rgba(201,104,58,0.3)" : "0 0 24px rgba(201,104,58,0.2)",
    btnSecondaryBorder: dark ? "rgba(201,104,58,0.45)" : "rgba(201,104,58,0.5)",
    btnSecondaryText:   dark ? "#e8905e" : "#c9683a",
    btnSecondaryBg:     dark ? "rgba(201,104,58,0.06)" : "rgba(201,104,58,0.04)",
    chatBg:         dark ? "#1a0e08" : "#fff8f4",
    chatBorder:     dark ? "rgba(201,104,58,0.25)" : "rgba(201,104,58,0.3)",
    chatInputBg:    dark ? "rgba(42,22,10,0.8)" : "rgba(253,224,208,0.35)",
    chatInputBorder:dark ? "rgba(201,104,58,0.3)" : "rgba(201,104,58,0.4)",
    chatMsgBotBg:   dark ? "rgba(42,22,10,0.9)" : "#fde0d0",
    chatMsgBotText: dark ? "#f5b99a" : "#5c2b12",
    chatMsgUserBg:  "#c9683a",
    chatQuickBg:    dark ? "rgba(42,22,10,0.8)" : "rgba(253,224,208,0.5)",
    chatQuickHov:   dark ? "rgba(201,104,58,0.2)" : "rgba(201,104,58,0.15)",
  };
}

const LETTER_COLORS_DARK  = { wave: ["#e8905e", "#fde0d0", "#e8905e"], base: ["#fde0d0", "#e8905e", "#fde0d0"] };
const LETTER_COLORS_LIGHT = { wave: ["#c9683a", "#3a1508", "#c9683a"], base: ["#3a1508", "#c9683a", "#3a1508"] };

export default function Hero() {
  const { t, i18n } = useTranslation();
  const dark = useTheme();
  const tk = getTokens(dark);

  const [chatOpen, setChatOpen] = useState(false);
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({ pseudo: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const WEB3FORMS_KEY = "abebf0c8-5d10-4973-835d-a1519ce5d330";

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
        const hash = target.getAttribute("href");
        if (hash && hash !== "#") {
          e.preventDefault();
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const quickQuestions = [
    { textKey: "quick_question_recherches",    replyKey: "quick_reply_recherches" },
    { textKey: "quick_question_disponibilites", replyKey: "quick_reply_disponibilites" },
    { textKey: "quick_question_parcours",       replyKey: "quick_reply_parcours" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.pseudo.trim()) newErrors.pseudo = t("pseudo_required");
    if (!formData.email.trim()) newErrors.email = t("email_required");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t("email_invalid");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitForm = async () => {
    if (!validateForm()) return;
    setIsSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
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
      const data = await res.json();
      if (data.success) {
        setStep("chat");
        setMessages([{ id: 1, text: t("welcome_message", { pseudo: formData.pseudo }), isBot: true, timestamp: new Date() }]);
      } else {
        alert("Erreur d'envoi : " + (data.message || "Réessayez"));
      }
    } catch (err) {
      console.error(err);
      alert("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setIsSending(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    const userMsg = { id: Date.now(), text: inputValue, isBot: false, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    const text = inputValue;
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
          message: text,
          subject: `Message de ${formData.pseudo} via le chat`,
        }),
      });
      setTimeout(() => setMessages((prev) => [...prev, {
        id: Date.now(), text: t("reply_thank_you", { email: formData.email }), isBot: true, timestamp: new Date(),
      }]), 500);
    } catch {
      setTimeout(() => setMessages((prev) => [...prev, {
        id: Date.now(), text: t("reply_error", { email: formData.email }), isBot: true, timestamp: new Date(),
      }]), 500);
    }
  };

  const handleQuickQuestion = (questionTextKey, replyKey) => {
    const questionText = t(questionTextKey);
    const replyText    = t(replyKey, { pseudo: formData.pseudo });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(),     text: questionText, isBot: false, timestamp: new Date() },
      { id: Date.now() + 1, text: replyText,    isBot: true,  timestamp: new Date() },
    ]);
  };

  const fullTitle = t("hero_title");
  const lang = i18n.language;
  let devPart, stackPart;
  if (lang === "fr") {
    const idx = fullTitle.indexOf(" ");
    devPart   = fullTitle.substring(0, idx);
    stackPart = fullTitle.substring(idx + 1);
  } else {
    const idx = fullTitle.lastIndexOf(" ");
    devPart   = fullTitle.substring(idx + 1);
    stackPart = fullTitle.substring(0, idx);
  }
  const devLetters   = devPart.split("");
  const stackLetters = stackPart.split("");
  const LC = dark ? LETTER_COLORS_DARK : LETTER_COLORS_LIGHT;

  return (
    <section
      className="relative min-h-screen overflow-hidden px-6 py-24 transition-colors duration-500"
      style={{ background: tk.bgPage, color: tk.textPrimary }}
    >
      {!isContactVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="fixed bottom-4 right-4 z-20"
        >
          <div
            className={`rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
              chatOpen ? "w-[260px] sm:w-[300px]" : "w-[48px] sm:w-[56px]"
            }`}
            style={{
              background: tk.chatBg,
              border: `1px solid ${tk.chatBorder}`,
            }}
          >
            <div
              className="p-2 cursor-pointer flex items-center justify-between"
              style={{ background: "linear-gradient(to right, #a04e27, #c9683a)" }}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.2)" }}>
                  <FaEnvelope size={14} color="white" />
                </div>
                {chatOpen && (
                  <div>
                    <p className="text-white font-bold text-xs">{t("contact_me")}</p>
                    <p className="text-[8px] text-white/80">
                      {step === "form" ? t("leave_coords") : formData.pseudo}
                    </p>
                  </div>
                )}
              </div>
              {chatOpen && <span className="text-white text-xs">▼</span>}
            </div>

            {chatOpen && (
              <div className="flex flex-col h-[320px] sm:h-[360px]">
                {step === "form" ? (
                  <div className="flex-1 p-3 space-y-2">
                    {[
                      { type: "text",  key: "pseudo",   placeholder: t("pseudo_placeholder"),   error: errors.pseudo },
                      { type: "email", key: "email",    placeholder: t("email_placeholder"),    error: errors.email },
                      { type: "tel",   key: "whatsapp", placeholder: t("whatsapp_placeholder"), error: null },
                    ].map(({ type, key, placeholder, error }) => (
                      <div key={key}>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={formData[key]}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          className="w-full p-2 rounded-lg outline-none text-xs transition"
                          style={{
                            background: tk.chatInputBg,
                            border: `1px solid ${tk.chatInputBorder}`,
                            color: tk.textPrimary,
                          }}
                        />
                        {error && <p className="text-red-400 text-[9px] mt-0.5">{error}</p>}
                      </div>
                    ))}
                    <button
                      onClick={handleSubmitForm}
                      disabled={isSending}
                      className="w-full text-white font-bold py-2 rounded-lg disabled:opacity-50 text-xs transition"
                      style={{ background: "linear-gradient(to right, #a04e27, #c9683a)" }}
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
                            className="max-w-[85%] p-1.5 rounded-lg text-[11px]"
                            style={{
                              background: msg.isBot ? tk.chatMsgBotBg : tk.chatMsgUserBg,
                              color: msg.isBot ? tk.chatMsgBotText : "white",
                            }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    <div className="px-2 pb-1">
                      <p className="text-[8px]" style={{ color: tk.textMuted }}>⚡ Questions fréquentes :</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {quickQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickQuestion(q.textKey, q.replyKey)}
                            className="text-[9px] px-1.5 py-0.5 rounded-full transition"
                            style={{
                              background: tk.chatQuickBg,
                              color: tk.textAccent,
                            }}
                          >
                            {t(q.textKey)}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-2 flex gap-1.5" style={{ borderTop: `1px solid ${tk.chatBorder}` }}>
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Votre message..."
                        className="flex-1 text-[11px] p-1.5 rounded-lg outline-none"
                        style={{
                          background: tk.chatInputBg,
                          border: `1px solid ${tk.chatInputBorder}`,
                          color: tk.textPrimary,
                        }}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="text-white px-2 rounded-lg text-xs font-medium"
                        style={{ background: "#c9683a" }}
                      >
                        Envoyer
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

          <div className="text-center lg:text-left">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{
                background: tk.bgBadge,
                border: `1px solid ${tk.borderBadge}`,
                color: tk.textAccent,
              }}
            >
              {t("hero_subtitle")}
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
                        animate={{ color: LC.wave }}
                        transition={{ duration: 2.5, delay: (devLetters.length - 1 - idx) * 0.12, repeat: Infinity, repeatType: "loop" }}
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
                        animate={{ color: LC.base }}
                        transition={{ duration: 2.5, delay: idx * 0.12, repeat: Infinity, repeatType: "loop" }}
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
                        animate={{ color: LC.base }}
                        transition={{ duration: 2.5, delay: idx * 0.12, repeat: Infinity, repeatType: "loop" }}
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
                        animate={{ color: LC.wave }}
                        transition={{ duration: 2.5, delay: (devLetters.length - 1 - idx) * 0.12, repeat: Infinity, repeatType: "loop" }}
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
              className="max-w-lg mx-auto lg:mx-0 text-base md:text-lg leading-relaxed mb-8"
              style={{ color: tk.textSecondary }}
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
                className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold overflow-hidden shadow-lg transition-all duration-300"
                style={{
                  background: "linear-gradient(to right, #a04e27, #c9683a)",
                  boxShadow: tk.accentGlow,
                }}
              >
                <span className="absolute inset-0 w-0 bg-white/10 transition-all duration-500 group-hover:w-full rounded-full" />
                <span className="relative flex items-center gap-2">
                  {t("contact_title")}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>

              <a
                href="#projects"
                className="group flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300"
                style={{
                  border: `1.5px solid ${tk.btnSecondaryBorder}`,
                  background: tk.btnSecondaryBg,
                  color: tk.btnSecondaryText,
                }}
              >
                <FaProjectDiagram style={{ color: tk.accent }} className="text-xl" />
                <span className="text-sm font-medium">{t("projects_title")}</span>
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
              <div
                className="absolute inset-0 rounded-full blur-2xl animate-pulse"
                style={{ background: tk.accentGlow }}
              />
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{ border: `2px solid rgba(201,104,58,0.45)` }}
              />
              <div
                className="absolute inset-4 rounded-full"
                style={{ border: `1.5px dashed rgba(201,104,58,0.28)` }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={heroPhoto}
                  alt="Aniyh"
                  className="w-full h-full rounded-full object-cover"
                  style={{
                    border: `4px solid ${tk.photoBorder}`,
                    boxShadow: tk.shadowPhoto,
                  }}
                />
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 max-w-xs text-center text-sm italic"
              style={{ color: tk.textMuted }}
            >
              {t("hero_quote")}
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}