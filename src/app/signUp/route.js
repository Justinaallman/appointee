import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  const {
    name,
    family,
    gender,
    medicalid,
    specialty,
    username,
    password,
    role,
  } = body;

  // چک یوزرنیم تکراری
  const exists = await prisma.user.findUnique({ where: { Username: username } });
  if (exists) {
    return Response.json({ error: "Username already exists" }, { status: 400 });
  }

  // چک فیلدهای اجباری
  if (!name || !family || !gender || !username || !password || !role) {
    return Response.json({ error: "Fill all required fields" }, { status: 400 });
  }

  // چک کانسترینت‌های مخصوص Doctor
  if (role === "Doctor") {
    if (!medicalid || !specialty) {
      return Response.json({ error: "Medical ID and specialty are required for doctors" }, { status: 400 });
    }
  } else {
    // اگر نقش غیر Doctor است، این دو فیلد باید null باشند
    if (medicalid || specialty) {
      return Response.json({ error: "Medical ID and specialty must be empty for non-doctors" }, { status: 400 });
    }
  }

  // ذخیره کاربر جدید
  const user = await prisma.user.create({
    data: {
      Name: name,
      LastName: family,
      Gender: gender,
      Username: username,
      Password: Number(password), // چون INTEGER است
      Role: role,
      Medical_ID: role === "Doctor" ? Number(medicalid) : null, // چون INTEGER است
      specialty: role === "Doctor" ? specialty : null,
    },
  });

  // ساخت توکن ساده برای تست
  const token = Buffer.from(user.Username).toString("base64");

  return Response.json({ token, user });
}