import AuthLayout from "@/components/layouts/auth";
import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import { authServices } from "@/services/auth/authServices";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

export default function RegisterView() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };
    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        push("/auth/login");
        toast({
          title: "Success",
          description: "Success register account",
          status: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "User is already exist",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-white mb-4">
        Create Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputAuth
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="Masukan Nama Lengkap"
        />
        <InputAuth
          label="Email"
          name="email"
          type="email"
          placeholder="Masukan Email"
        />
        <InputAuth
          label="Password"
          name="password"
          type="password"
          placeholder="********"
        />
        <ButtonAuth type="submit">
          {isLoading ? "Loading..." : "Register"}
        </ButtonAuth>
      </form>
      <p className="mt-6 text-center text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
