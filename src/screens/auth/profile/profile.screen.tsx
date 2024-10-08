import GamesCarousel from "@components/carousels/games.carousel";
import UpdateProfileForm from "@components/forms/auth/update-profile.form";
import PostsList from "@components/lists/posts.list";
import Verified from "@components/verified.component";
import { useAuthStore } from "@stores/auth/auth.store";
import { GetMeDto, UserRole } from "@stores/user/user.model";
import UserRequest from "@stores/user/user.request";
import { useResponsive } from "@utils/useResponsive";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useUserStore } from "../../../stores/user/user.store";

const ProfileScreen = () => {
  const { id } = useParams();
  const [data, setData] = useState<GetMeDto | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isMobile } = useResponsive();
  const { logout } = useAuthStore();
  const { setProfilePicture } = useUserStore();

  useEffect(() => {
    document.title = `Pixel Wave | ${data?.user.pseudo}`;
    UserRequest.getMe().then(setData);
  }, [id, data?.user.pseudo]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formData = new FormData();
    const file = event.target.files![0];
    formData.append("profilePicture", file);
    if (file)
      UserRequest.updateProfilePicture(formData).then((x) => {
        setData({
          ...data!,
          user: {
            ...data!.user,
            profilePicture: x,
          },
          posts: data!.posts.map((y) => ({
            ...y,
            user: {
              ...y.user,
              profilePicture: x,
            },
          })),
        });
        setProfilePicture(x);
        toast.success("Photo de profil mise à jour avec succès");
      });
  };

  const handleToggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const handleLogout = () => {
    toast("Voulez vous vous déconnecter ?", {
      duration: 5000,
      action: {
        label: "Oui",
        onClick: () => {
          logout();
        },
      },
    });
  };

  const handleDeletePost = (postId: string) => {
    setData({
      ...data!,
      posts: data!.posts.filter((x) => x.id !== postId),
    });
  };

  if (data === null)
    return (
      <div className="mx-auto block mt-4 loading loading-spinner loading-lg"></div>
    );

  const content = () => {
    if (isMobile)
      return isSettingsOpen ? (
        <div className="mt-4 px-8">
          <UpdateProfileForm
            handleClose={handleToggleSettings}
            user={data.user}
            receiveEmails={data.receiveEmails}
            hideHeader
          />
        </div>
      ) : (
        <>
          {(data.favoriteGames.length && (
            <>
              <div className="px-4 flex justify-between w-full pt-2">
                <h2 className="font-semibold text-lg">
                  Jeux Favoris
                  <span className="ml-2 indicator indicator-item badge badge-outline">
                    {data.favoriteGames.length}
                  </span>
                </h2>
                <p>Voir tout</p>
              </div>
              <GamesCarousel games={data.favoriteGames} />
            </>
          )) || (
            <h2 className="font-semibold text-lg px-4">
              Vous n'avez aucun jeu en favoris
            </h2>
          )}
          <section className="px-4 w-full pt-2 flex flex-col gap-2">
            {(data.posts.length && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">
                    Posts
                    <span className="ml-2 indicator indicator-item badge badge-outline">
                      {data.posts.length}
                    </span>
                  </h2>
                  <p>Voir tout</p>
                </div>
                {<PostsList posts={data.posts} onDelete={handleDeletePost} />}
              </>
            )) ||
              null}
          </section>
        </>
      );

    if (isSettingsOpen)
      return (
        <div className="w-2/6 mt-4 mx-auto">
          <UpdateProfileForm
            handleClose={handleToggleSettings}
            user={data.user}
            receiveEmails={data.receiveEmails}
            hideHeader
          />
        </div>
      );

    return (
      <section className="flex w-full px-4">
        <section className="flex flex-1 flex-col gap-2">
          {(data.favoriteGames.length && (
            <>
              <div className="flex justify-between w-full">
                <h2 className="font-semibold">
                  Jeux Favoris
                  <span className="ml-2 indicator indicator-item badge badge-outline">
                    {data.favoriteGames.length}
                  </span>
                </h2>
                <p>Voir tout</p>
              </div>
              <div className="grid grid-cols-2 gap-4 gap-x-6">
                {data.favoriteGames.map((x) => (
                  <Link
                    to={`/game/${x.name}`}
                    key={x.id}
                    className="cursor-pointer select-none hover:scale-105 transition-all duration-300"
                  >
                    <img
                      className="object-cover rounded-md"
                      src={
                        x.logo === "default"
                          ? "https://gaming-cdn.com/images/products/16007/380x218/elden-ring-edition-l-ombre-de-l-arbre-monde-shadow-of-the-erdtree-edition-pc-jeu-steam-europe-cover.jpg?v=1715598000"
                          : x.logo
                      }
                      alt={x.name}
                    />
                    <p className="font-medium text-sm capitalize">{x.name}</p>
                  </Link>
                ))}
              </div>
            </>
          )) || <h2 className="font-semibold">Aucun jeu à afficher</h2>}
        </section>
        <div className="divider divider-horizontal"></div>
        <section className="flex flex-col flex-1 gap-2 justify-start">
          {(data.posts.length && (
            <>
              <div className="flex justify-between w-full">
                <h2 className="font-semibold">
                  Posts
                  <span className="ml-2 indicator indicator-item badge badge-outline">
                    {data.posts.length}
                  </span>
                </h2>
                <p>Voir tout</p>
              </div>
              {<PostsList posts={data.posts} onDelete={handleDeletePost} />}
            </>
          )) || <h2 className="font-semibold">Aucun post à afficher</h2>}
        </section>
      </section>
    );
  };

  return (
    <section>
      <header className="relative flex py-4 flex-col items-center border-neutral border-b">
        <button
          data-cy="logout"
          onClick={handleLogout}
          className="btn btn-outline btn-accent absolute top-4 right-4"
        >
          <LuLogOut />
        </button>
        <label
          htmlFor="profile-picture-input"
          className="avatar cursor-pointer"
        >
          <div className="w-24 rounded-full">
            <img
              src={data.user.profilePicture || "/default-pfp.jpeg"}
              alt="Profile picture"
            />
          </div>
        </label>
        <input
          id="profile-picture-input"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <div className="flex items-center gap-1">
          <h1 className="flex items-baseline text-xl">@{data.user.pseudo}</h1>
          <Verified role={data.user.role} />
        </div>
        <p>
          Inscrit depuis le {dayjs(data.user.createdAt).format("DD MMM YYYY")}
        </p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleToggleSettings}
            className="btn btn-outline btn-accent flex-1"
          >
            {isSettingsOpen ? "Profil" : "Règlages"}
          </button>
          {[UserRole.ADMIN, UserRole.MODERATOR].includes(data.user.role) && (
            <button className="btn btn-outline btn-accent flex-1">Admin</button>
          )}
        </div>
      </header>
      {content()}
    </section>
  );
};

export default ProfileScreen;
