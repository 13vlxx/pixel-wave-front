import { useResponsive } from "@/_utils/use-responsive";
import { UserProfileHeader, UserProfileHeaderSkeleton } from "@/components/custom/_utils/user-profile.header";
import { GetMeDto } from "@/stores/user/user.model";
import UserRequest from "@/stores/user/user.request";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProfileScreen = () => {
  const { id } = useParams();
  const [data, setData] = useState<GetMeDto | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isMobile } = useResponsive();
  const { setProfilePicture } = useUserStore();

  useEffect(() => {
    document.title = `Pixel Wave | ${data?.user.pseudo}`;
    UserRequest.getMe().then(setData);
  }, [id, data?.user.pseudo]);

  if (!data)
    return (
      <section className="h-screen">
        <UserProfileHeaderSkeleton />
      </section>
    );

  return (
    <section className="h-screen">
      <UserProfileHeader user={data.user} />
      <div className="h-px mx-auto my-2 w-[96dvw] bg-muted"></div>
    </section>
  );
};
