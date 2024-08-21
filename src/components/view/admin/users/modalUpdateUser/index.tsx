import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Dropdown from "@/components/ui/dropdown";
import { userServices } from "@/services/user";
import { Spinner, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

type Props = {
  setUpdatedUser: any;
  updatedUser: any;
  setUsersData: any;
};

export default function ModalUpdateUser({
  setUpdatedUser,
  updatedUser,
  setUsersData,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(updatedUser.role);
  const session: any = useSession();
  const toast = useToast();

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = {
      role: selectedRole,
    };
    const result = await userServices.updateUser(
      updatedUser.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      toast({
        title: "Success",
        description: "User updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to update user",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h2 className="text-xl font-bold">Update User</h2>
      <form onSubmit={handleUpdateUser} className="space-y-4">
        <InputAuth
          className="text-gray-700"
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="Masukan Nama Lengkap"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <InputAuth
          className="text-gray-700"
          label="Email"
          name="email"
          type="email"
          placeholder="Masukan Email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Dropdown
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Admin", value: "admin" },
            { label: "Member", value: "member" },
          ]}
          onChange={(value) => setSelectedRole(value)} // Handle change
        />
        <ButtonAuth type="submit">
          {isLoading ? <Spinner /> : "Update"}
        </ButtonAuth>
      </form>
    </Modal>
  );
}
