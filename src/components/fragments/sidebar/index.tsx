import ButtonAuth from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
};

export default function Sidebar({ lists }: Props) {
  const { pathname } = useRouter();
  return (
    <aside className="text-white bg-gray-900 p-6 h-screen flex flex-col justify-between">
      <div className="space-y-12">
        <h2 className="text-7xl font-extrabold text-center text-sky-500">
          <i className="bx bxs-bolt bx-flashing" />
        </h2>
        <div className="flex flex-col gap-4">
          {lists.map((list, index) => (
            <Link
              key={index}
              href={list.url}
              className={`${
                pathname === list.url ? "bg-sky-500" : "bg-gray-800"
              } flex items-center gap-4 py-2 pl-3 pr-10 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform hover:bg-sky-600 hover:scale-105`}
            >
              <i className={`bx ${list.icon} text-xl`} />
              <h4 className="text-base">{list.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <ButtonAuth
        onClick={() => signOut()}
        variant="bg-red-600 hover:bg-red-800"
        className="transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        Logout
      </ButtonAuth>
    </aside>
  );
}
