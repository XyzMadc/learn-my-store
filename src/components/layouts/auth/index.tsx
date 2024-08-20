import { useRouter } from "next/router";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { pathname } = useRouter();
  return (
    <div className="flex min-h-screen bg-gray-950">
      <div className="flex flex-col justify-center w-full max-w-lg p-8 bg-gray-900 text-white">
        {children}
        <p className="text-center text-gray-400 text-xs mt-4">
          &copy;2024 Madz Store. All rights reserved.
        </p>
      </div>

      <div className="hidden md:flex w-full bg-blue-600 justify-center items-center">
        <h2 className="text-3xl font-bold text-white">
          {pathname.split("/")[2] === "register"
            ? "Welcome to Madz Store"
            : "Welcome Back!"}
        </h2>
      </div>
    </div>
  );
}
