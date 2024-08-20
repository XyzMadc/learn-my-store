import UserAdminView from "@/components/view/admin/users";
import { userServices } from "@/services/user";
import { useEffect, useState } from "react";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <UserAdminView users={users} />
    </>
  );
}
