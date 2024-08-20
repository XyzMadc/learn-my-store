import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { userServices } from "@/services/user";
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
  const [error, setError] = useState("");
  const session: any = useSession();
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
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
    } else {
      setIsLoading(false);
      setError("Email is already exist");
    }

    setIsLoading(false);
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h2 className="text-xl font-bold">Update User</h2>
      <form onSubmit={handleUpdateUser}>
        <InputAuth
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="Masukan Nama Lengkap"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <InputAuth
          label="Email"
          name="email"
          type="email"
          placeholder="Masukan Email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { value: "admin", label: "Admin" },
            { value: "member", label: "Member" },
          ]}
        />
        <ButtonAuth type="submit">
          {isLoading ? "Loading..." : "Update"}
        </ButtonAuth>
      </form>
    </Modal>
  );
}
