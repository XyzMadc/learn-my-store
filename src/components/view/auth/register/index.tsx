import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
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
      phoneNumber: form.phoneNumber.value,
      password: form.password.value,
    };
    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
    <section className="bg-gray-300 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-xl space-y-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 text-black space-y-5"
        >
          <h1 className="text-3xl font-bold">Register</h1>
          {error && <p className="text-red-500 text-base">{error}</p>}
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
            label="Nomor Telefon"
            name="phoneNumber"
            type="text"
            placeholder="Masukan Nomor Telfon"
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
          <p className="text-gray-700 text-center">
            Already have an account?{" "}
            <Link className="text-blue-500 font-medium" href="/auth/login">
              SignIn
            </Link>{" "}
          </p>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Madz Store. All rights reserved.
        </p>
      </div>
    </section>
  );
}
