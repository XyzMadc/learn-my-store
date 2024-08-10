import AdminLayout from "@/components/layouts/admin";
import { useEffect, useState } from "react";
import ModalUpdateUser from "./modalUpdateUser";
import ModalDeleteUser from "./modalDeleteUser";

type User = {
  fullname: string;
  email: string;
  role: string;
};

type Props = {
  users: User[];
};

export default function UserView({ users }: Props) {
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [deletedUser, setDeletedUser] = useState<any>({});
  const [usersData, setUsersData] = useState<any>([]);

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
            <thead className="bg-zinc-800">
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
            <tbody className="text-gray-700">
              {usersData.map((user: any, index: number) => (
                <tr key={index} className="border-b">
                  <td className="w-1/12 py-3 px-4">{index + 1}.</td>
                  <td className="w-4/12 py-3 px-4">{user.fullname}</td>
                  <td className="w-4/12 py-3 px-4">{user.email}</td>
                  <td className="w-2/12 py-3 px-4">{user.role}</td>
                  <td className="w-1/12 text-xl text-center">
                    <button
                      type="button"
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => setUpdatedUser(user)}
                    >
                      <i className="bx bxs-edit" />
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-900 ml-4"
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
        />
      )}
      {Object.keys(deletedUser).length && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
        />
      )}
    </>
  );
}
