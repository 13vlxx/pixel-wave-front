import { useResponsive } from "@/_utils/use-responsive";
import { PostFeed } from "@/components/custom/_utils/post.feed";
import { UserProfileHeader, UserProfileHeaderSkeleton } from "@/components/custom/_utils/user-profile.header";
import { GameCarousel } from "@/components/custom/carousels/game-carousel";
import { EditProfileModal } from "@/components/custom/modals/edit-profile.modal";
import PostRequest from "@/stores/post/post.request";
import { GetMeDto } from "@/stores/user/user.model";
import UserRequest from "@/stores/user/user.request";
import { useUserStore } from "@/stores/user/user.store";
// @ts-expect-error pww
import ColorThief from "color-thief-ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const ProfileScreen = () => {
  const { id } = useParams();
  const [data, setData] = useState<GetMeDto | null>(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [bannerColor, setBannerColor] = useState<string>("");
  const { isMobile } = useResponsive();
  const { setProfilePicture } = useUserStore();

  const colorThief = useMemo(() => new ColorThief(), []);

  console.log(data);

  const handleBannerChange = useCallback(
    async (imageURL: string) => {
      const dominantColor = await colorThief.getColorAsync(imageURL);
      setBannerColor(dominantColor);
    },
    [colorThief],
  );

  useEffect(() => {
    document.title = `Pixel Wave | ${data?.user.pseudo}`;
    UserRequest.getMe().then(async (x) => {
      setData(x);
      handleBannerChange(x.user.profilePicture);
    });
  }, [id, data?.user.pseudo, handleBannerChange]);

  if (!data)
    return (
      <section className="h-screen">
        <UserProfileHeaderSkeleton />
      </section>
    );

  const handleEditClick = () => {
    setShowEditProfileModal(true);
  };

  const handlePFPChange = async (pfp: string) => {
    const dominantColor = await colorThief.getColorAsync(pfp);
    setBannerColor(dominantColor);
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

  const handleDeletePost = (postId: string) => {
    PostRequest.deletePost(postId).then(() => {
      setData({
        ...data!,
        posts: data!.posts.filter((x) => x.id !== postId),
      });
      toast.success("Post supprimé avec succès !");
    });
  };

  return (
    <>
      <section>
        <UserProfileHeader bannerColor={bannerColor} user={data.user} onEditClick={handleEditClick} />
        <div className="h-px mx-auto my-2 w-[96dvw] bg-muted"></div>
        {data.favoriteGames.length > 0 && <GameCarousel title="Jeux favoris" games={data.favoriteGames} hideGameName />}
        <PostFeed title="Posts" posts={data.posts} onDeletePost={handleDeletePost} />
      </section>
      <EditProfileModal
        receiveEmails={data.receiveEmails}
        user={data.user}
        isOpen={showEditProfileModal}
        onClose={(x) => {
          setShowEditProfileModal(false);
          if (x !== undefined) setData({ ...data, receiveEmails: x });
        }}
        onPfpChange={handlePFPChange}
      />
    </>
  );
};
