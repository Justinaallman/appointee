import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend) // بارگذاری ترجمه‌ها از فایل‌ها
  .use(LanguageDetector) // تشخیص زبان مرورگر
  .use(initReactI18next) // اتصال به React
  .init({
    fallbackLng: "fa", // زبان پیش‌فرض
    debug: true,
    interpolation: {
      escapeValue: false, // جلوگیری از مشکلات XSS
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // مسیر فایل‌های ترجمه
    },
  });

export default i18n;