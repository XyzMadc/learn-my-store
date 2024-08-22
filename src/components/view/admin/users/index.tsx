import AdminLayout from "@/components/layouts/admin";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./modalUpdateUser";
import ModalDeleteUser from "./modalDeleteUser";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";

type Props = {
  users: User[];
};

export default function UserAdminView({ users }: Props) {
  const [updatedUser, setUpdatedUser] = useState<User | {}>({});
  const [deletedUser, setDeletedUser] = useState<User | {}>({});
  const [usersData, setUsersData] = useState<User[]>([]);

  const session: any = useSession();

  useEffect(() => {
    setUsersData(users);
  }, [users]);

  return (
    <>
      <AdminLayout>
        <header>
          <h1 className="text-xl font-bold uppercase">user management</h1>
        </header>
        <div className="shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-900">
              <tr>
                <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">
                  #
                </th>
                <th className="w-3/12 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Fullname
                </th>
                <th className="w-4/12 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Email
                </th>
                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Role
                </th>
                <th className="w-2/12 text-left py-3 px-4 uppercase font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-900 bg-gray-500">
              {usersData.map((user: User, index: number) => (
                <tr key={index} className="border-b border-gray-950">
                  <td className="w-1/12 py-3 px-4">{index + 1}.</td>
                  <td className="w-4/12 py-3 px-4">{user.fullname}</td>
                  <td className="w-4/12 py-3 px-4">{user.email}</td>
                  <td className="w-2/12 py-3 px-4">{user.role}</td>
                  <td className="w-1/12 text-xl text-center">
                    <button
                      type="button"
                      className="text-blue-800 hover:text-blue-600"
                      onClick={() => setUpdatedUser(user)}
                    >
                      <i className="bx bxs-edit" />
                    </button>
                    <button
                      type="button"
                      className="text-red-800 hover:text-red-600 ml-4"
                      onClick={() => setDeletedUser(user)}
                    >
                      <i className="bx bxs-trash" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
          session={session}
        />
      )}
      {Object.keys(deletedUser).length && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
          session={session}
        />
      )}
    </>
  );
}
