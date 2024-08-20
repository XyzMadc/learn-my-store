import Modal from "@/components/ui/modal";
import { userServices } from "@/services/user";
import { useSession } from "next-auth/react";

type Props = {
  setDeletedUser: any;
  deletedUser: any;
  setUsersData: any;
};

export default function ModalDeleteUser({
  setDeletedUser,
  deletedUser,
  setUsersData,
}: Props) {
  const session: any = useSession();

  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsersData(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h2 className="text-lg font-bold mb-4">Delete User</h2>
      <p className="text-gray-700 mb-4">
        Are you sure want to delete user {deletedUser.fullname}?
      </p>
      <div className="flex justify-end space-x-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setDeletedUser({})}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => handleDelete()}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
