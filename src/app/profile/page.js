"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, TextField, Avatar } from "@mui/material";
import LanguageToggle from "../../components/LanguageToggle";
import { useTranslation } from "react-i18next";
import "./profile.css";
import useFontDirection from "@/hooks/useFontDirection";
import DoctorImg from "/public/images/doctor.png";
import PatientImg from "/public/images/patient.png";
import "../i18n";

export default function Profile() {
    const { t, i18n } = useTranslation();
    const [lang, setLang] = useState(i18n.language || "en");
    useFontDirection(lang);

    // اینجا اطلاعات کاربر و نوبت‌ها را از API بگیر
    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [presence, setPresence] = useState({ from: "", to: "" });

    useEffect(() => {
        // اینجا درخواست به API بزن و user و appointments را مقداردهی کن
        // مثال:
        // fetch("/api/profile").then(...).then(data => setUser(data.user))
        // fetch("/api/appointments").then(...).then(data => setAppointments(data.appointments))
    }, []);

    // تایید یا لغو نوبت
    const handleAppointment = (id, status) => {
        // درخواست به API برای تغییر وضعیت نوبت
        // سپس state را آپدیت کن
    };

    if (!user) {
        return <Typography sx={{ mt: 8, textAlign: "center" }}>{t("Loading")}</Typography>;
    }

    return (
        
        <Box className="profile-root">
            <div className="lang-toggle-container">
                <LanguageToggle value={lang} onChange={setLang} />
            </div>

            <Box className="profile-dashboard">
                <Avatar
                    src={user.role === "doctor" ? DoctorImg.src : PatientImg.src}
                    alt={user.name}
                    className="profile-avatar animated"
                    sx={{ width: 90, height: 90, mb: 2 }}
                />
                <Typography variant="h5" sx={{ mb: 1 }}>{user.name}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {user.role === "doctor" ? t("Doctor") : t("Patient")}
                </Typography>
            </Box>

            {user.role === "doctor" && (
                <Box className="doctor-panel">
                    <Box className="presence-box" sx={{ mt: 4, mb: 3 }}>
                        <Typography variant="h6">{t("PresenceHours")}</Typography>
                        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                            <TextField
                                label={t("FromHour")}
                                type="time"
                                value={presence.from}
                                onChange={(e) => setPresence({ ...presence, from: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label={t("ToHour")}
                                type="time"
                                value={presence.to}
                                onChange={(e) => setPresence({ ...presence, to: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button variant="contained" sx={{ height: 56 }}>
                                {t("Save")}
                            </Button>
                        </Box>
                    </Box>

                    <Box className="appointments-box">
                        <Typography variant="h6" sx={{ mb: 2 }}>{t("Appointments")}</Typography>
                        {appointments.length === 0 ? (
                            <Typography color="text.secondary">{t("NoAppointments")}</Typography>
                        ) : (
                            appointments.map((a) => (
                                <Box key={a.id} className="appointment-row">
                                    <Typography>{a.patient} - {a.date}</Typography>
                                    {a.status === "pending" ? (
                                        <Box>
                                            <Button
                                                size="small"
                                                color="success"
                                                onClick={() => handleAppointment(a.id, "approved")}
                                                sx={{ mr: 1 }}
                                            >
                                                {t("Approve")}
                                            </Button>
                                            <Button
                                                size="small"
                                                color="error"
                                                onClick={() => handleAppointment(a.id, "rejected")}
                                            >
                                                {t("Reject")}
                                            </Button>
                                        </Box>
                                    ) : (
                                        <Typography color={a.status === "approved" ? "green" : "red"}>
                                            {a.status === "approved" ? t("Approved") : t("Rejected")}
                                        </Typography>
                                    )}
                                </Box>
                            ))
                        )}
                    </Box>
                </Box>
                
            )}

            {user.role === "patient" && (
                <Box className="patient-panel">
                    <Typography variant="h6">{t("WelcomePatient")}</Typography>
                </Box>
            )}
        </Box>
    );
}



