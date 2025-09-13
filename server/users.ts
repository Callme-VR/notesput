"use server";

import { auth } from "@/lib/auth";

export const SignInUser = async (email: string, password: string) => {
  const response = await auth.api.signInEmail({
    body: { email, password },
    asResponse: true,
  });
};

export const SignUpuser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      asResponse:true,
    });
  } catch (error) {}
};
