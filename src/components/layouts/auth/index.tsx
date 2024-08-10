import Link from "next/link";

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  error?: string;
  header: string;
  linkHref: string;
  account: string;
  linkText: string;
};

export default function AuthLayout({
  onSubmit,
  children,
  error,
  header,
  linkHref,
  account,
  linkText,
}: Props) {
  return (
    <section className="bg-gray-50 min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={onSubmit} className="space-y-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            {header}
          </h1>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {children}
          <p className="text-sm text-gray-600 text-center">
            {account}{" "}
            <Link
              className="text-blue-500 font-medium hover:underline"
              href={linkHref}
            >
              {linkText}
            </Link>
          </p>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          &copy;2024 Madz Store. All rights reserved.
        </p>
      </div>
    </section>
  );
}
