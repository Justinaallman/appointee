"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LanguageToggle from "../../components/LanguageToggle";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "./signUp.css";
import useFontDirection from "@/hooks/useFontDirection";
import DoctorImg from "/public/images/doctor.png";
import PatientImg from "/public/images/patient.png";
import Image from "next/image";
import "../i18n";


export default function SignUp() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [role, setRole] = useState(null); // مقدار اولیه null
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");
  const [form, setForm] = useState({
    name: "",
    family: "",
    gender: "",
    medicalid: "",
    specialty: "",
    email: "",
    password: "",
  });
  const [acceptRules, setAcceptRules] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useFontDirection(lang);

  const handleLanguageChange = (newLang) => {
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const roles = [
    {
      key: "doctor",
      label: t("Doctor"),
      img: DoctorImg,
    },
    {
      key: "patient",
      label: t("Patient"),
      img: PatientImg,
    },
  ];

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  // فرم
  const doctorSteps = [
    [
      <TextField key="name" label={t("Name")} fullWidth margin="normal" value={form.name} onChange={handleChange("name")} error={!!errors.name} helperText={errors.name ? t("FillThisField") : ""} />,
      <TextField key="family" label={t("LastName")} fullWidth margin="normal" value={form.family} onChange={handleChange("family")} error={!!errors.family} helperText={errors.family ? t("FillThisField") : ""} />,
      <FormControl key="gender" fullWidth margin="normal" error={!!errors.gender}>
        <InputLabel>{t("Gender")}</InputLabel>
        <Select
          label={t("Gender")}
          value={form.gender}
          onChange={handleChange("gender")}
          defaultValue=""
        >
          <MenuItem value="male">{t("Male")}</MenuItem>
          <MenuItem value="female">{t("Female")}</MenuItem>
          <MenuItem value="other">{t("Other")}</MenuItem>
        </Select>
        {errors.gender && (
          <Typography color="error" variant="caption">{t("FillThisField")}</Typography>
        )}
      </FormControl>,
      <TextField key="medicalid" label={t("MedicalID")} fullWidth margin="normal" value={form.medicalid} onChange={handleChange("medicalid")} />,
    ],
    [
      <TextField key="specialty" label={t("Specialty")} fullWidth margin="normal" value={form.specialty} onChange={handleChange("specialty")} />,
      <TextField key="username" label={t("Username")} fullWidth margin="normal" value={form.username} onChange={handleChange("username")} />,
      <TextField key="password" label={t("Password")} type="password" fullWidth margin="normal" value={form.password} onChange={handleChange("password")} />,
    ],
  ];

  const patientSteps = [
    [
      <TextField key="name" label={t("Name")} fullWidth margin="normal" value={form.name} onChange={handleChange("name")} error={!!errors.name} helperText={errors.name ? t("FillThisField") : ""} />,
      <TextField key="family" label={t("LastName")} fullWidth margin="normal" value={form.family} onChange={handleChange("family")} error={!!errors.family} helperText={errors.family ? t("FillThisField") : ""} />,
      <FormControl key="gender" fullWidth margin="normal" error={!!errors.gender}>
        <InputLabel>{t("Gender")}</InputLabel>
        <Select
          label={t("Gender")}
          value={form.gender}
          onChange={handleChange("gender")}
          defaultValue=""
        >
          <MenuItem value="male">{t("Male")}</MenuItem>
          <MenuItem value="female">{t("Female")}</MenuItem>
          <MenuItem value="other">{t("Other")}</MenuItem>
        </Select>
        {errors.gender && (
          <Typography color="error" variant="caption">{t("FillThisField")}</Typography>
        )}
      </FormControl>,
    ],
    [
      <TextField key="email" label={t("Email")} fullWidth margin="normal" value={form.email} onChange={handleChange("email")} />,
      <TextField key="password" label={t("Password")} type="password" fullWidth margin="normal" value={form.password} onChange={handleChange("password")} />,
    ],
  ];

  // انتخاب مراحل بر اساس نقش
  const stepsArr = role === "doctor" ? doctorSteps : patientSteps;

  const handleSignUp = async () => {
    const requiredFields = role === "doctor"
      ? ["name", "family", "gender", "medicalid", "specialty", "email", "password"]
      : ["name", "family", "gender", "email", "password"];
    let newErrors = {};
    requiredFields.forEach((f) => {
      if (!form[f]) newErrors[f] = true;
    });
    if (!acceptRules) newErrors.acceptRules = true;
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        router.push("/profile");
      } else {
        console.error("Sign up failed:", data.message);
        // نمایش خطا به کاربر
      }
    } catch (e) { 
      console.error("Sign up error:", e);
      // نمایش خطا به کاربر
    }
    setLoading(false);
  };

  return (
    <>
      <title>{t("SignUp")}</title>
      
        <div className="lang-toggle-container">
          <LanguageToggle value={lang} onChange={handleLanguageChange} />
        </div>
      <Box className="signup-root">
        {showWelcome ? (
          <div className="welcome-animation">
            <span className="welcome-text">{t("WelcomeToAppointee")}</span>
          </div>
        ) : (
          <div className={`role-form-row${role ? " role-selected" : ""}`}>
            {/* کارت‌ها */}
            {roles.map((item) => (
              (!role || role === item.key) && (
                <div
                  key={item.key}
                  className={`role-card${role === item.key ? " selected" : ""}`}
                  onClick={() => !role && setRole(item.key)}
                >
                  <Image
                    src={item.img}
                    alt={item.label}
                    width={140}
                    height={140}
                    className="role-img"
                    onClick={() => setRole(null)}
      title={t("ChangeRole")}
                  />
                  <div className="role-label">{item.label}</div>
                </div>
              )
            ))}
            {/* فرم فقط بعد انتخاب نقش */}
            {role && (
              <Box
                className="slide-box"
                style={{
                  Height: role === "doctor" ? "70vh" : "50vh"
                }}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  onClick={() => {
                    if (step === 1) setRole(null);
                    else setStep(step - 1);
                  }}
                >
                  {step === 1 ? t("Back") : t("Previous")}
                </Button>
                <Box className="step-fields-box">
                  {stepsArr[step - 1]}
                </Box>
                {step < stepsArr.length ? (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => setStep(step + 1)}
                  >
                    {t("Next")}
                  </Button>
                ) : (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={acceptRules}
                          onChange={(e) => setAcceptRules(e.target.checked)}
                        />
                      }
                      label={t("AcceptRules")}
                      sx={{ alignSelf: "start", mt: 1, color: errors.acceptRules ? "error.main" : undefined }}
                    />
                    {errors.acceptRules && (
                      <Typography color="error" variant="caption">{t("AcceptRulesAlert")}</Typography>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={handleSignUp}
                      disabled={loading}
                    >
                      {loading ? t("Loading") : t("SignUp")}
                    </Button>
                    <Button
                      variant="text"
                      color="secondary"
                      fullWidth
                      sx={{ mt: 1 }}
                      onClick={() => router.push("/login")}
                    >
                      {t("AlreadyHaveAccount")}
                    </Button>
                  </>
                )}
              </Box>
            )}
          </div>
        )}
      </Box>
    </>
  );
}