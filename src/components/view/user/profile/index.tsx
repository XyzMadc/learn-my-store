import UserLayout from "@/components/layouts/user";
import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import { uploadFile } from "@/lib/firebase/service";
import { userServices } from "@/services/user";
import { Spinner, useToast } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";

export default function ProfileUserView({ profile, setProfile, session }: any) {
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");
  const toast = useToast();

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading("avatar");
    const file = e.target.elements["upload-avatar"].files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );

            if (result.status === 200) {
              setIsLoading("");
              setProfile({ ...profile, image: newImageURL });
              setChangeImage({});
              e.target[0].value = "";
              toast({
                title: "Success",
                description: "Success Change Avatar!",
                status: "success",
                duration: 3000,
              });
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
            toast({
              title: "Error",
              description: "Failed Change Avatar!",
              status: "error",
              duration: 3000,
            });
          }
        }
      );
    }
  };

  const handleChangeProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading("profile");
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
    };

    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading("");
      setProfile({ ...profile, fullname: data.fullname });
      form.reset();
      toast({
        title: "Success",
        description: "Success Change Profile!",
        status: "success",
        duration: 3000,
      });
    } else {
      setIsLoading("");
      toast({
        title: "Error",
        description: "Failed Change Profile!",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading("password");
    const form = e.target as HTMLFormElement;
    const data = {
      password: form["newPassword"].value,
      currentPassword: form["currentPassword"].value,
      encPassword: profile.password,
    };
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setIsLoading("");
      form.reset();
      toast({
        title: "Success",
        description: "Success Change Password!",
        status: "success",
        duration: 3000,
      });
    } else {
      setIsLoading("");
      toast({
        title: "Error",
        description: "Failed Change Password!",
        status: "error",
        duration: 3000,
      });
    }
  };
  return (
    <UserLayout>
      <h1 className="text-2xl font-bold text-center">Profile Page</h1>
      <main className="flex items-start justify-center gap-6 p-6 bg-gray-900 rounded-lg shadow-lg">
        {/* Avatar */}
        <section className="p-6 bg-gray-950 rounded-xl shadow-lg shadow-gray-950 border-b border-gray-900">
          <form onSubmit={handleChangeProfilePicture} className="space-y-6">
            <div className="w-full flex items-center justify-center">
              {profile.image ? (
                <figure className="w-32 h-32 rounded-full overflow-hidden relative group shadow-lg">
                  <Image
                    src={profile.image}
                    alt="Avatar"
                    width={128}
                    height={128}
                    className="object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <label
                    htmlFor="upload-avatar"
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:bg-black group-hover:bg-opacity-50 transition-all duration-300 ease-in"
                  >
                    <p className="text-white text-xs text-center font-medium scale-0 group-hover:scale-100 transition-all duration-300 ease-in">
                      Upload a new avatar
                    </p>
                  </label>
                </figure>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-700 flex justify-center items-center text-3xl uppercase font-medium relative group overflow-hidden shadow-lg">
                  {profile?.fullname
                    ?.split(" ")
                    .slice(0, 2)
                    .map((word: string) => word.charAt(0))
                    .join("")}
                  <label
                    htmlFor="upload-avatar"
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:bg-black group-hover:bg-opacity-50 transition-all duration-300 ease-in"
                  >
                    <p className="text-white text-xs text-center font-medium scale-0 group-hover:scale-100 transition-all duration-300 ease-in">
                      Upload a new avatar
                    </p>
                  </label>
                </div>
              )}
            </div>
            <p
              className={`text-sm font-medium text-center ${
                changeImage.name ? "bg-gray-700 text-white" : "text-gray-400"
              } py-2 px-4 rounded-lg transition-colors duration-300`}
            >
              {changeImage.name ? changeImage.name : "Upload a new avatar"}
            </p>
            <ButtonAuth type="submit" className="shadow-md shadow-blue-950">
              {isLoading === "avatar" ? <Spinner /> : "Change Avatar"}
            </ButtonAuth>
            <input
              type="file"
              id="upload-avatar"
              name="upload-avatar"
              className="hidden"
              onChange={(e: any) => setChangeImage(e.currentTarget.files[0])}
            />
            <p className="text-[.64rem] font-light text-center text-gray-400 mt-2">
              Maximum upload size is <strong>1 MB</strong>.
            </p>
          </form>
        </section>

        {/* Form Profile */}
        <section className="p-5 w-2/5 bg-gray-950 rounded-lg shadow-lg shadow-gray-950 border-b border-gray-900">
          <form onSubmit={handleChangeProfile} className="space-y-4">
            <InputAuth
              label="Full Name"
              name="fullname"
              type="text"
              defaultValue={profile.fullname}
            />
            <InputAuth
              label="Email"
              name="email"
              type="email"
              defaultValue={profile.email}
              disabled
            />
            <InputAuth
              label="Role"
              name="role"
              type="text"
              defaultValue={profile.role}
              disabled
            />
            <ButtonAuth
              type="submit"
              className="w-full shadow-md shadow-blue-950"
            >
              {isLoading === "profile" ? <Spinner /> : "Update Profile"}
            </ButtonAuth>
          </form>
        </section>

        {/* Form Change Password */}
        <section className="w-[35%] p-6 bg-gray-950 rounded-lg shadow-md shadow-gray-950 border-b border-gray-900">
          <form onSubmit={handleChangePassword} className="space-y-4">
            <InputAuth
              label="Current Password"
              name="currentPassword"
              type="password"
            />
            <InputAuth
              label="New Password"
              name="newPassword"
              type="password"
            />
            <ButtonAuth
              type="submit"
              className="w-full shadow-md shadow-blue-950"
            >
              {isLoading === "password" ? <Spinner /> : "Update Password"}
            </ButtonAuth>
          </form>
        </section>
      </main>
    </UserLayout>
  );
}
