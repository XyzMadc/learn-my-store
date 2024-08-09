import Sidebar from "@/components/fragments/sidebar";

type Props = {
  children: React.ReactNode;
};

const listSidebar = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "bxs-dashboard",
  },
  {
    title: "Product",
    url: "/admin/products",
    icon: "bxs-package",
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: "bxs-notepad",
  },
  {
    title: "User",
    url: "/admin/users",
    icon: "bxs-user",
  },
];

export default function AdminLayout({ children }: Props) {
  return (
    <div>
      <Sidebar lists={listSidebar} />
      {children}
    </div>
  );
}
