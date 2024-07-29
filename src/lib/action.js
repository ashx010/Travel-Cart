"use server";

import { redirect } from "next/navigation";

export const handleRegisterSubmit = async (formData) => {

  try {
    const api_url = process.env.REGISTER_API_URL;
    const response = await fetch(api_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return { status: 'Register Success' };
    }
  } catch (error) {
    console.error('Failed to register', error);
    return { status: 'Register Failed' };
  }
};