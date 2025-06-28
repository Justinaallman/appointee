"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Container, Paper, CircularProgress, Drawer } from "@mui/material";
import LanguageToggle from "../../components/LanguageToggle";
import { useTranslation } from "react-i18next";
import "./profile.css";
import useFontDirection from "@/hooks/useFontDirection";
import DoctorImg from "/public/images/doctor.png";
import PatientImg from "/public/images/patient.png";
import { useRouter } from 'next/navigation';
import "../i18n";

export default function Profile() {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [lang, setLang] = useState(i18n.language || "en");
    useFontDirection(lang);

    const toggleLanguage = () => {
        const newLang = lang === "fa" ? "en" : "fa";
        i18n.changeLanguage(newLang);
        setLang(newLang);
    };

    const [user, setUser] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [presence, setPresence] = useState({ from: "", to: "" });
    const [loading, setLoading] = useState(true);

    // انیمیشن خوش آمدید باید اینجا باشد
    const [welcomePos, setWelcomePos] = useState("left");
    const [showDoctorPanel, setShowDoctorPanel] = useState(false);
    const [showPatientPanel, setShowPatientPanel] = useState(false);
    const [showDoctorDrawer, setShowDoctorDrawer] = useState(false);
    const [showPatientDrawer, setShowPatientDrawer] = useState(false);

    useEffect(() => {
        setWelcomePos("right");
        const timeout = setTimeout(() => setWelcomePos("right"), 2500);
        return () => clearTimeout(timeout);
    }, [user]);

    useEffect(() => {
        const checkAuth = async () => {
            const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
            if (!userData) {
                router.push('/login');
                return;
            }
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (error) {
                router.push('/login');
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    useEffect(() => {
        if (user) {
            fetch("/api/profile", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) setUser(data.user);
                })
                .catch(() => {});

            fetch("/api/appointments", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.appointments) setAppointments(data.appointments);
                })
                .catch(() => {});
        }
    }, [user]);

    const handleAppointment = (id, status) => {
        // درخواست به API برای تغییر وضعیت نوبت
        // سپس state را آپدیت کن
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!user) return null;

    // مدیریت نمایش باکس مدیریت نوبت‌ها (پزشک)
    const DoctorProfile = () => (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                {t("DoctorDashboard")}
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => setShowDoctorDrawer(true)}
                >
                    {t("ManageAppointments")}
                </Button>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 2 }}
                    onClick={() => setShowDoctorDrawer(true)}
                >
                    {t("SetSchedule")}
                </Button>
                {/* Drawer مدیریت نوبت‌ها */}
                <Drawer
                    anchor="right"
                    open={showDoctorDrawer}
                    onClose={() => setShowDoctorDrawer(false)}
                    PaperProps={{ sx: { width: 350, p: 2 } }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            {t("AppointmentsList")}
                        </Typography>
                        {appointments.length === 0 ? (
                            <Typography color="text.secondary">{t("NoAppointments")}</Typography>
                        ) : (
                            appointments.map((a) => (
                                <Paper key={a.id} sx={{ p: 2, mb: 1 }}>
                                    <Typography>
                                        {t("Patient")}: {a.patientName}
                                    </Typography>
                                    <Typography>
                                        {t("Time")}: {a.time}
                                    </Typography>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="success"
                                        sx={{ mr: 1 }}
                                        onClick={() => handleAppointment(a.id, "accept")}
                                    >
                                        {t("Accept")}
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleAppointment(a.id, "reject")}
                                    >
                                        {t("Reject")}
                                    </Button>
                                </Paper>
                            ))
                        )}
                    </Box>
                </Drawer>
            </Box>
        </Paper>
    );

    const PatientProfile = () => (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                {t("PatientDashboard")}
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mb: 2 }}
                    onClick={() => setShowPatientDrawer(true)}
                >
                    {t("MyAppointments")}
                </Button>
                {/* Drawer نوبت‌های بیمار */}
                <Drawer
                    anchor="right"
                    open={showPatientDrawer}
                    onClose={() => setShowPatientDrawer(false)}
                    PaperProps={{ sx: { width: 350, p: 2 } }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            {t("AppointmentsList")}
                        </Typography>
                        {appointments.length === 0 ? (
                            <Typography color="text.secondary">{t("NoAppointments")}</Typography>
                        ) : (
                            appointments.map((a) => (
                                <Paper key={a.id} sx={{ p: 2, mb: 1 }}>
                                    <Typography>
                                        {t("Doctor")}: {a.doctorName}
                                    </Typography>
                                    <Typography>
                                        {t("Time")}: {a.time}
                                    </Typography>
                                    <Typography>
                                        {t("Status")}: {t(a.status)}
                                    </Typography>
                                </Paper>
                            ))
                        )}
                    </Box>
                </Drawer>
            </Box>
        </Paper>
    );

    return (
        <Container maxWidth="lg" className="profile-main-container">
            {/* خوش آمدید - بالای باکس اطلاعات کاربر */}
            <div className={`welcome-banner ${welcomePos === "right" ? "right" : "left"}`}>
                {t("Welcome")}, {user?.Name}!
            </div>

            {/* باکس اطلاعات کاربر - سمت راست */}
            <div className="profile-info-box">
                <Typography sx={{ mb: 1 }}>
                    <strong>{t("Name")}:</strong> {user.Name} {user.LastName}
                </Typography>
                {user?.Role === "Doctor" && (
                    <>
                        <Typography sx={{ mb: 1 }}>
                            <strong>{t("Specialty")}:</strong> {user.specialty || t("NotSpecified")}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                            <strong>{t("MedicalID")}:</strong> {user.Medical_ID || t("NotSpecified")}
                        </Typography>
                    </>
                )}
                <Typography sx={{ mb: 1 }}>
                    <strong>{t("Role")}:</strong> {t(user.Role)}
                </Typography>
                <Button
                    variant="text"
                    color="error"
                    sx={{ mt: 2, alignSelf: "flex-end" }}
                    onClick={() => {
                        localStorage.removeItem('user');
                        sessionStorage.removeItem('user');
                        router.push('/login');
                    }}
                >
                    {t("Logout")}
                </Button>
            </div>

            {/* باکس اصلی محتوا - وسط صفحه */}
            <div className="profile-content-box">
                <header style={{ width: "100%" }}>
                    <div className="lang-toggle-container">
                        <LanguageToggle
                            value={lang}
                            onChange={toggleLanguage}
                        />
                    </div>
                </header>
                <Box sx={{ width: "100%", maxWidth: 600, mt: 2 }}>
                    {user?.Role === "Doctor" ? <DoctorProfile /> : <PatientProfile />}
                </Box>
            </div>
        </Container>
    );
}



