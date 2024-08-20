import ProfileUserView from "@/components/view/user/profile";
import { userServices } from "@/services/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfileUserPage() {
  const [profile, setProfile] = useState({});
  const session: any = useSession();

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);
  return (
    <div>
      <ProfileUserView
        profile={profile}
        setProfile={setProfile}
        session={session}
      />
      ;
    </div>
  );
}
