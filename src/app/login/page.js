"use client";

import React, { useState, useEffect } from "react";
import { Button, Box, TextField, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n.js";
import "./login.css";
import useFontDirection from "../../hooks/useFontDirection";
import LanguageToggle from "../../components/LanguageToggle";
import { useRouter } from "next/navigation";

export default function Login() {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [lang, setLang] = useState(i18n.language || "en");
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  useFontDirection(lang);

  const handleLogin = async () => {
    if (!username || !password) {
      setError(t("FillAllFields"));
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          username, 
          password: Number(password)
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.user) {
        // ذخیره اطلاعات کامل کاربر Role
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("user", JSON.stringify(data.user));
        router.push("/profile");
      } else {
        setError(data.error || t("LoginFailed"));
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(t("NetworkError")); 
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const toggleLanguage = () => {
    const newLang = lang === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  if (!isClient) {
    return null; 
  }

  return (
    <>
      <title>{t("Login")}</title>
      <header>
        <div className="lang-toggle-container">
          <LanguageToggle
            value={lang}
            onChange={toggleLanguage}
          />
        </div>
      </header>
      <div>
        <Box className="login-box">
          <div className="login-image-side">
            <img
              src="/images/Untitled3.png"
              alt="welcome"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          <div className="login-form-side" onKeyDown={handleKeyPress}>
            <img
              className="login-avatar"
              src="/images/profileavatar.png"
              alt="profile avatar"
            />
            <TextField
              id="Username"
              label={t("Username")}
              variant="outlined"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyPress}
              sx={{ mb: 2 }}
            />
            <TextField
              id="Password"
              label={t("Password")}
              type="password"
              variant="outlined"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              sx={{ mb: 2 }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 1 }}>{error}</Typography>
            )}
            <Button 
              variant="contained" 
              onClick={handleLogin} 
              disabled={loading}
              sx={{ mb: 1 }}
            >
              {loading ? t("Loading") : t("Login")}
            </Button>
            <Button variant="outlined" onClick={() => router.push("/signUp")}>{t("Register")}</Button>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
              }
              label={t("RememberMe")}
              sx={{ alignSelf: "center", marginBottom: 1 }}
            />
          </div>
        </Box>
      </div>
    </>
  );
}