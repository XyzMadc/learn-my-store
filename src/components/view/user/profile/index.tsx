import UserLayout from "@/components/layouts/user";
import ButtonAuth from "@/components/ui/button";
import InputAuth from "@/components/ui/input";
import { uploadFile } from "@/lib/firebase/service";
import { userServices } from "@/services/user";
import Image from "next/image";
import React, { useState } from "react";

export default function ProfileUserView({ profile, setProfile, session }: any) {
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
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
              setIsLoading(false);
              setProfile({ ...profile, image: newImageURL });
              setChangeImage({});
              e.target[0].value = "";
            } else {
              setIsLoading(false);
            }
          } else {
            setIsLoading(false);
            setChangeImage({});
          }
        }
      );
    }
  };
  return (
    <UserLayout>
      <h1 className="text-2xl font-bold text-center">Profile Page</h1>
      <main className="flex items-start justify-center gap-6 p-6 bg-gray-900 rounded-lg shadow-lg">
        {/* Avatar */}
        <section className="w-[20%] p-6 bg-gray-950 rounded-xl shadow-lg shadow-gray-950">
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
                <div className="w-32 h-32 rounded-full bg-gray-700 flex justify-center items-center text-3xl font-medium relative group overflow-hidden shadow-lg">
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
            <ButtonAuth
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
            >
              {isLoading ? "Uploading..." : "Change Avatar"}
            </ButtonAuth>
            <input
              type="file"
              id="upload-avatar"
              name="upload-avatar"
              className="hidden"
              onChange={(e: any) => setChangeImage(e.currentTarget.files[0])}
            />
            <p className="text-xs font-light text-center text-gray-400 mt-2">
              Maximum upload size is <strong>1 MB</strong>. <br />
              Supported formats: JPG, PNG.
            </p>
          </form>
        </section>

        {/* Form Profile */}
        <section className="w-[45%] p-4 bg-gray-950 rounded-lg shadow-lg shadow-gray-950">
          <form className="space-y-4">
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
            />
            <ButtonAuth type="submit" className="w-full">
              Update Profile
            </ButtonAuth>
          </form>
        </section>

        {/* Form Change Password */}
        <section className="w-[35%] p-6 bg-gray-950 rounded-lg shadow-md shadow-gray-950">
          {/* Add your change password form here */}
        </section>
      </main>
    </UserLayout>
  );
}
