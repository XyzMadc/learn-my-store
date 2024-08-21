import Modal from "@/components/ui/modal";
import { userServices } from "@/services/user";
import { Spinner, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const session: any = useSession();
  const toast = useToast();

  const handleDelete = async () => {
    const result = await userServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(true);
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      toast({
        title: "Success",
        description: "User deleted successfully",
        status: "success",
        duration: 3000,
      });
    } else {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to delete user",
        status: "error",
        duration: 3000,
      });
    }
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
          {isLoading ? <Spinner /> : "Delete"}
        </button>
      </div>
    </Modal>
  );
}
