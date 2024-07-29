"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const handleRegisterSubmit = async (formData) => {
  try {
    const { name, username, email, password, country, contactNumber, address } =
      await formData;

    // Validate input data (you can use a library like Joi or custom validation)
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !country ||
      !contactNumber ||
      !address
    ) {
      return { error: "All fields are required" }, { status: 400 };
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }, { contactNumber }],
      },
    });

    if (existingUser) {
      return { error: "User already exists" }, { status: 400 };
    }

    const saltIndex = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, saltIndex);
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        country,
        contactNumber,
        address,
        status: true,
      },
    });

    return { status: "Register Success" };
  } catch (error) {
    console.error("Failed to register", error);
    return { status: "Register Failed" };
  }
};
