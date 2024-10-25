import { useResponsive } from "@/_utils/use-responsive";
import { PostFeed } from "@/components/custom/_utils/post.feed";
import { UserProfileHeader, UserProfileHeaderSkeleton } from "@/components/custom/_utils/user-profile.header";
import { GameCarousel } from "@/components/custom/carousels/game-carousel";
import { GetUserProfileDto } from "@/stores/user/user.model";
import UserRequest from "@/stores/user/user.request";
import { useUserStore } from "@/stores/user/user.store";
// @ts-expect-error pww
import ColorThief from "color-thief-ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

export const ProfileByIdScreen = () => {
  const { userId } = useParams();
  const { id } = useUserStore();
  const { isMobile } = useResponsive();
  const [data, setData] = useState<GetUserProfileDto | null>(null);
  const [bannerColor, setBannerColor] = useState<string>("");

  const colorThief = useMemo(() => new ColorThief(), []);

  const handleBannerChange = useCallback(
    async (imageURL: string) => {
      const dominantColor = await colorThief.getColorAsync(imageURL);
      setBannerColor(dominantColor);
    },
    [colorThief],
  );

  useEffect(() => {
    document.title = `Pixel Wave | ${data?.user.pseudo}`;
    if (id === userId) window.location.href = "/profile/me";
  }, [id, userId, data?.user.pseudo]);

  useEffect(() => {
    UserRequest.getUserById(userId!, id)
      .then((x) => {
        setData(x);
        handleBannerChange(x.user.profilePicture);
      })
      .catch(() => {
        setData(null);
      });
  }, [userId, id, handleBannerChange]);

  if (!data)
    return (
      <section className="h-screen">
        <UserProfileHeaderSkeleton />
      </section>
    );

  return (
    <section>
      <UserProfileHeader bannerColor={bannerColor} user={data.user} />
      <div className="h-px mx-auto my-2 w-[96dvw] bg-muted"></div>
      {data.favoriteGames.length > 0 && <GameCarousel title="Jeux favoris" games={data.favoriteGames} hideGameName />}
      <PostFeed title="Posts" posts={data.posts} />
    </section>
  );
};
