import Sidebar from "@/components/fragments/sidebar";

type Props = {
  children: React.ReactNode;
};

const listSidebar = [
  {
    title: "Dashboard",
    url: "/user",
    icon: "bxs-dashboard",
  },
  {
    title: "Orders",
    url: "/user/orders",
    icon: "bxs-cart",
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: "bxs-user",
  },
];

export default function UserLayout({ children }: Props) {
  return (
    <div className="flex bg-gray-950">
      <Sidebar lists={listSidebar} />
      <main className="w-full text-white p-10 space-y-4">{children}</main>
    </div>
  );
}
