import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import { GoogleLogo } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function LoginView() {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
        form.reset();
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <section className="bg-gray-300 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl space-y-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 text-black space-y-5"
        >
          <h1 className="text-3xl font-bold">Login</h1>
          {error && <p className="text-red-500 text-base">{error}</p>}
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
            {isLoading ? "Loading..." : "Login"}
          </ButtonAuth>
          <ButtonAuth
            type="button"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className="gap-2"
          >
            <i className="bx bxl-google"></i> Login with Google
          </ButtonAuth>
          <p className="text-gray-700 text-center">
            Don{"'"}t have an account?{" "}
            <Link className="text-blue-500 font-medium" href="/auth/register">
              SignUp
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
