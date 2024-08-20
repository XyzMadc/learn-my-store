import AuthLayout from "@/components/layouts/auth";
import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import { authServices } from "@/services/auth/authServices";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

export default function RegisterView() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      email: form.email.value,
      password: form.password.value,
    };
    const result = await authServices.registerAccount(data);

    if (result.status === 200) {
      form.reset();
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already exist");
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-white mb-4">
        Create Account
      </h2>
      {error && <p className="text-red-500">{error}</p>}
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
