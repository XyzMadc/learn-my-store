import AuthLayout from "@/components/layouts/auth";
import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import { useToast } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function LoginView() {
  const { push, query } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
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
        toast({
          title: "Success",
          description: "Login success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Email or password is incorrect",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Login failed, please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-white mb-4">Log in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
      </form>
      <p className="mt-6 text-center text-gray-400">
        Don{"'"}t have an account?{" "}
        <Link href="/auth/register" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
