import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

// ── Tokens terracotta (inlined pour éviter un import circulaire)
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
    inputBg: dark ? "rgba(42,22,10,0.8)" : "rgba(253,224,208,0.35)",
    inputBorder: dark ? "rgba(201,104,58,0.3)" : "rgba(201,104,58,0.4)",
    inputFocus: "#c9683a",
    chatBg: dark ? "rgba(26,14,8,0.95)" : "rgba(255,248,244,0.95)",
    chatHeader: "linear-gradient(to right, #a04e27, #c9683a)",
    chatMsgBotBg: dark ? "rgba(42,22,10,0.9)" : "#fde0d0",
    chatMsgBotText: dark ? "#f5b99a" : "#5c2b12",
    chatMsgUserBg: "#c9683a",
    chatMsgUserText: "#ffffff",
    chatQuickBg: dark ? "rgba(42,22,10,0.8)" : "rgba(253,224,208,0.5)",
    chatQuickHov: dark ? "rgba(201,104,58,0.2)" : "rgba(201,104,58,0.15)",
    iconColor: "#c9683a",
    socialHover: dark ? "rgba(201,104,58,0.2)" : "rgba(201,104,58,0.15)",
    borderPage: dark ? "rgba(201,104,58,0.18)" : "rgba(201,104,58,0.25)",
  };
}

export default function Contact() {
  const { t } = useTranslation();
  const dark = useTheme();
  const tk = getTokens(dark);

  const address = "Fianarantsoa, Madagascar";
  const phone = "+261 34 28 04 260";
  const email = "nomenjanaharyaniyh@gmail.com";

  const socialLinks = {
    facebook: "https://www.facebook.com/people/Aniyh-Nomenjanahary/100088888587802/",
    linkedin: "https://www.linkedin.com/in/aniyh-nomenjanaharyary/",
    github: "https://github.com/aniyh123",
    whatsapp: "https://wa.me/261342804260",
  };

  const [chatOpen, setChatOpen] = useState(false);
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({ pseudo: "", email: "", whatsapp: "" });
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  const WEB3FORMS_KEY = "abebf0c8-5d10-4973-835d-a1519ce5d330";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          subject: `Message de ${formData.pseudo} via le chat (contact)`,
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

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden px-6 py-24 transition-colors duration-500"
      style={{ background: tk.bgPage, color: tk.textPrimary }}
    >
      <div className="relative mx-auto max-w-7xl">
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
                {t("contact.subtitle")}
              </span>
              <span style={{ fontSize: 11, color: tk.textMuted, opacity: 0.6 }}>
                / 06
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
              {t("contact.titleBefore")}{" "}
              <span style={{ color: tk.accent }}>{t("contact.highlight")}</span>{" "}
              {t("contact.titleAfter")}
            </h2>
          </div>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold" style={{ color: tk.textPrimary }}>
                {t("contact_me_left")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" style={{ color: tk.iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span style={{ color: tk.textSecondary }}>{address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" style={{ color: tk.iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${phone}`} className="transition" style={{ color: tk.textSecondary }}>
                    {phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6" style={{ color: tk.iconColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${email}`} className="transition" style={{ color: tk.textSecondary }}>
                    {email}
                  </a>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl overflow-hidden transition-all"
              style={{
                border: `1px solid ${tk.cardBorder}`,
                boxShadow: tk.cardShadow,
              }}
            >
              <iframe
                title="Google Maps - Fianarantsoa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122847.184288189!2d47.083956!3d-21.454231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21fde5f1c7e7e2f3%3A0x9f2c1b5c8a9d6e7!2sFianarantsoa%2C%20Madagascar!5e0!3m2!1sfr!2sfr!4v1710000000000!5m2!1sfr!2sfr"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              ></iframe>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4" style={{ color: tk.textPrimary }}>
                {t("find_me_on")}
              </h4>
              <div className="flex gap-4">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  }}
                >
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  }}
                >
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C0.792 0 0 0.774 0 1.729v20.542C0 23.227 0.792 24 1.771 24h20.451c0.979 0 1.771-0.773 1.771-1.729V1.729C24 0.774 23.204 0 22.225 0z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  }}
                >
                  <svg className="w-6 h-6" style={{ color: tk.textPrimary }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.166 6.84 9.49.5.09.66-.217.66-.483 0-.237-.01-1.03-.015-1.87-2.78.605-3.37-1.342-3.37-1.342-.454-1.16-1.11-1.47-1.11-1.47-.91-.622.07-.61.07-.61 1.006.071 1.536 1.033 1.536 1.033.893 1.53 2.34 1.087 2.91.832.09-.647.35-1.087.637-1.338-2.22-.253-4.555-1.11-4.555-4.94 0-1.09.39-1.983 1.03-2.68-.103-.254-.45-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.908-1.294 2.746-1.026 2.746-1.026.55 1.377.203 2.393.1 2.647.64.697 1.028 1.59 1.028 2.68 0 3.842-2.337 4.684-4.565 4.932.36.31.68.924.68 1.86 0 1.344-.012 2.426-.012 2.756 0 .267.158.577.667.479C19.14 20.164 22 16.42 22 12c0-5.52-4.48-10-10-10z" />
                  </svg>
                </a>
                <a
                  href={socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full transition-all duration-300 hover:scale-110"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  }}
                >
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.5 3.45 1.44 4.94L2 22l5.33-1.55c1.45.88 3.1 1.34 4.8 1.34 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 2.5c4.1 0 7.43 3.33 7.43 7.43s-3.33 7.43-7.43 7.43c-1.44 0-2.83-.42-4.01-1.2l-.28-.17-3.15.92.96-3.1-.18-.3c-.84-1.2-1.28-2.6-1.28-4.06 0-4.1 3.33-7.43 7.43-7.43zM9.93 8.23c-.23 0-.53.04-.79.15-.26.11-.51.26-.72.47-.22.21-.48.5-.69.85-.47.71-.71 1.5-.71 2.29 0 .9.24 1.75.71 2.53.21.35.46.64.68.85.22.21.47.36.73.47.26.11.56.15.79.15.32 0 .65-.05.94-.15.29-.1.56-.24.79-.44.23-.2.43-.43.59-.68.32-.46.5-.98.5-1.52v-.28c-.04-.16-.16-.29-.32-.33l-1.14-.35c-.16-.05-.33-.02-.45.1-.12.12-.17.28-.13.44.04.16.13.31.24.44.11.13.24.23.38.3.14.07.29.11.44.11.33 0 .65-.11.9-.31.25-.2.44-.48.55-.79.11-.31.16-.65.14-.99 0-.34-.05-.67-.16-.97-.11-.3-.27-.56-.48-.78-.21-.22-.46-.39-.73-.51-.27-.12-.56-.18-.85-.18z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl shadow-2xl overflow-hidden transition-all"
            style={{
              background: tk.cardBg,
              border: `1px solid ${tk.cardBorder}`,
            }}
          >
            <div
              className="p-3 cursor-pointer flex items-center justify-between"
              style={{ background: tk.chatHeader }}
              onClick={() => setChatOpen(!chatOpen)}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <FaEnvelope size={24} color="white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{t("contact_me")}</p>
                  <p className="text-[10px] text-white/80">
                    {step === "form" ? t("leave_coords") : formData.pseudo}
                  </p>
                </div>
              </div>
              <span className="text-white">{chatOpen ? "▼" : "▲"}</span>
            </div>

            {chatOpen && (
              <div className="flex flex-col h-[480px]">
                {step === "form" ? (
                  <div className="flex-1 p-4 space-y-3">
                    <input
                      type="text"
                      placeholder={t("pseudo_placeholder")}
                      value={formData.pseudo}
                      onChange={(e) => setFormData({ ...formData, pseudo: e.target.value })}
                      className="w-full p-2.5 rounded-xl outline-none transition"
                      style={{
                        background: tk.inputBg,
                        border: `1px solid ${tk.inputBorder}`,
                        color: tk.textPrimary,
                      }}
                    />
                    {errors.pseudo && <p className="text-red-500 text-[10px]">{errors.pseudo}</p>}

                    <input
                      type="email"
                      placeholder={t("email_placeholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl outline-none transition"
                      style={{
                        background: tk.inputBg,
                        border: `1px solid ${tk.inputBorder}`,
                        color: tk.textPrimary,
                      }}
                    />
                    {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}

                    <input
                      type="tel"
                      placeholder={t("whatsapp_placeholder")}
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full p-2.5 rounded-xl outline-none transition"
                      style={{
                        background: tk.inputBg,
                        border: `1px solid ${tk.inputBorder}`,
                        color: tk.textPrimary,
                      }}
                    />

                    <button
                      onClick={handleSubmitForm}
                      disabled={isSending}
                      className="w-full text-white font-bold py-2.5 rounded-xl disabled:opacity-50 transition"
                      style={{ background: tk.chatHeader }}
                    >
                      {isSending ? t("sending") : t("start_button")}
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                          <div
                            className="max-w-[85%] p-2.5 rounded-xl text-xs"
                            style={{
                              background: msg.isBot ? tk.chatMsgBotBg : tk.chatMsgUserBg,
                              color: msg.isBot ? tk.chatMsgBotText : tk.chatMsgUserText,
                            }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="px-3 pb-2">
                      <p className="text-[9px]" style={{ color: tk.textMuted }}>
                        ⚡ Questions fréquentes :
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {quickQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleQuickQuestion(q.textKey, q.replyKey)}
                            className="text-[10px] px-2 py-1 rounded-full transition"
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

                    <div
                      className="p-3 flex gap-2"
                      style={{ borderTop: `1px solid ${tk.cardBorder}` }}
                    >
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Votre message..."
                        className="flex-1 text-xs p-2 rounded-xl outline-none transition"
                        style={{
                          background: tk.inputBg,
                          border: `1px solid ${tk.inputBorder}`,
                          color: tk.textPrimary,
                        }}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="text-white px-3 rounded-xl text-sm font-medium transition"
                        style={{ background: tk.chatMsgUserBg }}
                      >
                        Envoyer
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}