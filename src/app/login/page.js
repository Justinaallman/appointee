"use client";

import React from "react";
import { Button, Box, TextField, Checkbox, FormControlLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import "../i18n.js";
import "./login.css";
import useFontDirection from "../../hooks/useFontDirection";
import LanguageToggle from "../../components/LanguageToggle";
import { useRouter } from "next/navigation"; 

export default function Login() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = React.useState(i18n.language || "en");
  const [rememberMe, setRememberMe] = React.useState(false);
  const router = useRouter();
  useFontDirection(lang);

  const toggleLanguage = () => {
    const newLang = lang === "fa" ? "en" : "fa";
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };
  const handleLogin = () => {
  // فرض: لاگین موفق انجام شده و توکن یا اطلاعات کاربر را داری
  const token = "user-token"; // از سرور بگیر

  if (rememberMe) {
    localStorage.setItem("token", token); // ذخیره دائمی
  } else {
    sessionStorage.setItem("token", token); // فقط تا بسته شدن تب
  }
  router.push("/profile");
};

  return (
    <>
    <title>{t("Login")}</title>
      <header>
        <div className="lang-toggle-container">
          <LanguageToggle
            value={lang}
            onChange={(newLang) => {
              i18n.changeLanguage(newLang);
              setLang(newLang);
            }}
          />
        </div>
      </header>
      <div>
        <Box className="login-box">
          {/* بخش عکس یا متن سمت چپ */}
          <div className="login-image-side">
            <img
              src="/images/Untitled3.png"
              alt="welcome"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          {/* فرم لاگین سمت راست */}
          <div className="login-form-side">
            <img
              className="login-avatar"
              src="/images/profileavatar.png"
              alt="profile avatar"
            />
            <TextField id="Username" label={t("Username")} variant="outlined" />
            <TextField
              id="Password"
              label={t("Password")}
              type="password"
              variant="outlined"
            />
            <Button variant="contained" onClick={handleLogin}>{t("Login")}</Button>
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