import AuthLayout from "@/components/layouts/auth";
import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import { signIn } from "next-auth/react";
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
    <AuthLayout
      onSubmit={handleSubmit}
      header="Login"
      error={error}
      linkHref="/auth/register"
      linkText="SignUp"
      account="Don't have an account?"
    >
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
        variant="bg-black hover:bg-slate-700"
      >
        <i className="bx bxl-google"></i> Login with Google
      </ButtonAuth>
    </AuthLayout>
  );
}
