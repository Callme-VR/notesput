"use server";

import { auth } from "@/lib/auth";

export const SignInUser = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: { email, password },
      asResponse: true,
    });
    return { success: true, message: "User SignedIn SuccessFully!" };
  } catch (error) {
    return { success: false, message: "Failed To SignIN!" };
  }
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
      asResponse: true,
    });
    return{success:true,message:"User Created SuccessFully!"}
  } catch (error) {
    return{success:false,message:"Failed To SignUp!"}
  }
};
