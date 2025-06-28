// app/login/page.jsx

"use client";

import { Button, Box, Typography, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import LanguageToggle from "./../components/LanguageToggle";
import { useTranslation } from "react-i18next";
import React from "react";
import "./home.css";
import useFontDirection from "../hooks/useFontDirection";
import "./i18n";

export default function HomePage() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang") || i18n.language || "fa";
    }
    return "fa";
  });

  useFontDirection(lang);

  useEffect(() => {
    if (lang && i18n.language !== lang && typeof i18n.changeLanguage === "function") {
      i18n.changeLanguage(lang);
      document.body.dir = lang === "fa" ? "rtl" : "ltr";
      localStorage.setItem("lang", lang);
    }
  }, [lang, i18n]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "fa" ? "en" : "fa"));
  };

  return (
    <Box className="home-root">
      <header className="home-header">
        <div className="lang-toggle-container">
          <LanguageToggle
            value={lang}
            onChange={toggleLanguage}
          />
        </div>
      </header>
      <Box className="main-content">
        <Box className="home-image-section">
          <img src="/images/home.png" alt="appointee" className="home-main-image" />
        </Box>
        <Box className="home-info-section">
          <Typography variant="h2" className="home-title">
            Appointee
          </Typography>
          <Typography variant="h4" className="home-details">
            {t("FastSimpleSmart")}
          </Typography>
          <Typography className="home-desc" sx={{ mt: 3 }}>
            {t("OnlineBookingDesc")}
          </Typography>
          <Button
            className="glass-btn"
            onClick={() => router.push("/login")}
            sx={{ mt: 5 }}
          >
            {t("GetStarted")}
          </Button>
        </Box>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        className="second-image-stack"
        sx={{
          background: "#e3f3fa",
          py: 6,
          mt: 6,
          borderRadius: "32px",
        }}
        spacing={6}
      >
        <Box className="second-image-section">
          <img
            src="/images/home2.png"
            alt="feature"
            className="second-main-image"
          />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ color: "#006eaa", fontWeight: "bold", mb: 2 }}>
            {t("MoreFeaturesTitle")}
          </Typography>
          <Box sx={{ color: "#333", fontSize: "1.1rem" }}>
            {t("MoreFeaturesDesc").split('\n').map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
