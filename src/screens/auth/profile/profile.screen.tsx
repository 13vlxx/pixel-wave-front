import { useResponsive } from "@/_utils/use-responsive";
import { UserProfileHeader, UserProfileHeaderSkeleton } from "@/components/custom/_utils/user-profile.header";
import { EditProfileModal } from "@/components/custom/modals/edit-profile.modal";
import { GetMeDto } from "@/stores/user/user.model";
import UserRequest from "@/stores/user/user.request";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const ProfileScreen = () => {
  const { id } = useParams();
  const [data, setData] = useState<GetMeDto | null>(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
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

  const handleEditClick = () => {
    setShowEditProfileModal(true);
  };

  const handlePFPChange = (pfp: string) => {
    setData({
      ...data!,
      user: {
        ...data!.user,
        profilePicture: pfp,
      },
      posts: data!.posts.map((y) => ({
        ...y,
        user: {
          ...y.user,
          profilePicture: pfp,
        },
      })),
    });
    setProfilePicture(pfp);
    toast.success("Photo de profil modifié avec succès !");
  };

  return (
    <>
      <section className="h-screen">
        <UserProfileHeader user={data.user} onEditClick={handleEditClick} />
        <div className="h-px mx-auto my-2 w-[96dvw] bg-muted"></div>
      </section>
      <EditProfileModal
        receiveEmails={data.receiveEmails}
        user={data.user}
        isOpen={showEditProfileModal}
        onClose={(x) => {
          setShowEditProfileModal(false);
          if (x) setData({ ...data, receiveEmails: x });
        }}
        onPfpChange={handlePFPChange}
      />
    </>
  );
};
