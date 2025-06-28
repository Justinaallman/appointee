import { useEffect } from "react";

export default function useFontDirection(lang, selector = "body") {
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;
    if (lang === "fa") {
      el.style.fontFamily = "'Vazirmatn', 'IRANSans', Tahoma, sans-serif";
      el.style.textAlign = "right";
      el.style.direction = "rtl";
    } else {
      el.style.fontFamily = "'Roboto', 'Arial', sans-serif";
      el.style.textAlign = "left";
      el.style.direction = "ltr";
    }
    return () => {
      el.style.fontFamily = "";
      el.style.direction = "";
      el.style.textAlign = "";
    };
  }, [lang, selector]);
}