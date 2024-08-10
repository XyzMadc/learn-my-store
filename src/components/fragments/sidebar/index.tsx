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
    <aside className="text-black bg-white p-5 w-56 h-screen flex flex-col justify-between">
      <div className="space-y-10">
        <h2 className="text-7xl font-bold text-center text-sky-400">
          <i className="bx bxs-bolt"></i>
        </h2>
        <div className="flex flex-col gap-4">
          {lists.map((list, index) => (
            <Link
              key={index}
              href={list.url}
              className={`${
                pathname === list.url && "bg-black text-white"
              } flex items-center gap-6 p-2 rounded-lg text-lg hover:bg-black hover:text-white transition-all duration-200 ease-in-out`}
            >
              <i className={`bx ${list.icon}`} />
              <h4 className="font-semibold text-base">{list.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <ButtonAuth
        onClick={() => signOut()}
        variant="bg-red-500 hover:bg-red-700"
      >
        Logout
      </ButtonAuth>
    </aside>
  );
}
