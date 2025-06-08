// app/login/page.jsx

"use client";

import { Button, Box, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.css"; // فایل CSS جدا برای استایل


export default function LoginPage() {
  const [role, setRole] = useState(null);
  const router = useRouter();

  if (!role) {
    return (
      <Stack alignItems="center" justifyContent="center" height="100vh" spacing={4}>
        <Typography variant="h4">شما چه کسی هستید؟</Typography>
        <Stack direction="row" spacing={4}>
          <Paper className={styles.card} elevation={3} onClick={() => setRole("doctor")}>
            <Typography variant="h6">👨‍⚕️ دکتر</Typography>
          </Paper>
          <Paper className={styles.card} elevation={3} onClick={() => setRole("patient")}>
            <Typography variant="h6">🧑‍💼 بیمار</Typography>
          </Paper>
        </Stack>
      </Stack>
    );
  }
<title>Home</title>
  return (
    <Box className="home-root">
      <header className="home-header">
        <Typography variant="h3" gutterBottom>
          سامانه مدیریت نوبت‌دهی اپوینتی
        </Typography>
        <Typography variant="h6" color="text.secondary">
          سریع، ساده و هوشمند نوبت بگیرید و مدیریت کنید!
        </Typography>
      </header>
      <Stack direction={{ xs: "column", md: "row" }} spacing={4} className="home-features">
        <Box className="feature-card">
          <img src="/images/calendar.png" alt="رزرو نوبت" />
          <Typography>رزرو آنلاین نوبت</Typography>
        </Box>
        <Box className="feature-card">
          <img src="/images/history.png" alt="سوابق" />
          <Typography>مشاهده سوابق</Typography>
        </Box>
        <Box className="feature-card">
          <img src="/images/reminder.png" alt="یادآوری" />
          <Typography>یادآوری پیامکی</Typography>
        </Box>
      </Stack>
      <div className="home-actions">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => router.push("/login")}
        >
          ورود
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => router.push("/signUp")}
          style={{ marginRight: 16 }}
        >
          ثبت‌نام
        </Button>
      </div>
      <footer className="home-footer">
        <Typography variant="body2" color="text.secondary">
          © 2025 Appointee | تماس: info@appointee.com
        </Typography>
      </footer>
    </Box>
  );
}
