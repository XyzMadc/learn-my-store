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
          <div className="space-y-2">
            <label
              className="text-gray-700 text-lg font-semibold"
              htmlFor="fullname"
            >
              Fullname
            </label>
            <input
              className="shadow appearance-none font-semibold border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              name="fullname"
              type="text"
              placeholder="Masukan Nama Lengkap"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-gray-700 text-lg font-semibold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none font-semibold border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Masukan Email"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-gray-700 text-lg font-semibold"
              htmlFor="phoneNumber"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none font-semibold border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNumber"
              name="phoneNumber"
              type="text"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-gray-700 text-lg font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none font-semibold border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link className="text-blue-500" href="/auth/login">
                SignIn
              </Link>{" "}
            </p>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Madz Store. All rights reserved.
        </p>
      </div>
    </section>
  );
}
