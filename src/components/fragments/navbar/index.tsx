import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export default function Navbar() {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-end w-full p-5 bg-black">
      <button
        className="border border-white px-7 py-1 rounded-md text-white font-semibold hover:bg-white hover:text-black transition-colors duration-300 ease-in drop-shadow-[0_0_0.1rem_#fff]"
        onClick={() => (data ? signOut() : signIn())}
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
}
