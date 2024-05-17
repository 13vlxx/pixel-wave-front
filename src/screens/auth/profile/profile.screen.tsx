import GamesCarousel from "@components/carousels/games.carousel";
import { useAuthStore } from "@stores/auth/auth.store";
import { GetUserProfileDto } from "@stores/user/user.model";
import UserRequest from "@stores/user/user.request";
import { PagesUnauth } from "@utils/router/routes";
import { useResponsive } from "@utils/useResponsive";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { toast } from "sonner";


const ProfileScreen = () => {
    const [data, setData] = useState<GetUserProfileDto | null>(null);
    const { isMobile } = useResponsive();
    const { logout } = useAuthStore();

    useEffect(() => {
        UserRequest.getProfile().then(setData)
    }, []);

    const handleNavigate = (destination: string) => {
        window.location.href = PagesUnauth.GAME + "/" + destination
    }

    const handleLogout = () => {
        toast("Voulez vous vous déconnecter ?", {
            duration: 5000,
            action: {
                label: 'Oui',
                onClick: () => {
                    logout()
                },
            },

        });
    }

    if (data === null) return <div className="mx-auto block mt-4 loading loading-spinner loading-lg"></div>

    const content = () => {

        if (isMobile)
            return (
                <section>
                    {
                        data.favoriteGames.length && <><div className="px-4 flex justify-between w-full pt-2">
                            <h2 className="font-semibold text-lg">Jeux Favoris
                                <span className="ml-2 indicator indicator-item badge badge-outline">{data.favoriteGames.length}</span>
                            </h2>
                            <p>Voir tout</p>
                        </div>
                            <GamesCarousel games={data.favoriteGames} />
                        </> || <h2 className="font-semibold text-lg px-4">Vous n'avez aucun jeu en favoris</h2>
                    }
                    <section className="px-4 flex items-center justify-between w-full pt-2">
                        {data.posts.length && <><h2 className="font-semibold text-lg">Posts
                            <span className="ml-2 indicator indicator-item badge badge-outline">{data.posts.length}</span>
                        </h2>
                            <p>Voir tout</p></> || null
                        }
                    </section>
                </section>
            )

        return (
            <section className="flex w-full px-4">
                <section className="flex flex-1 flex-col gap-2">
                    {data.favoriteGames.length && <><div className="flex justify-between w-full">
                        <h2 className="font-semibold">Jeux Favoris
                            <span className="ml-2 indicator indicator-item badge badge-outline">{data.favoriteGames.length}</span>
                        </h2>
                        <p>Voir tout</p>
                    </div>
                        <div className="grid grid-cols-2 gap-4 gap-x-6">
                            {
                                data.favoriteGames.map((x) => (
                                    <div onClick={() => handleNavigate(x.name)} key={x.id} className="cursor-pointer select-none hover:scale-105 transition-all duration-300">
                                        <img className="object-cover rounded-md" src={x.logo === "default" ? "https://gaming-cdn.com/images/products/16007/380x218/elden-ring-edition-l-ombre-de-l-arbre-monde-shadow-of-the-erdtree-edition-pc-jeu-steam-europe-cover.jpg?v=1715598000" : x.logo} alt={x.name} />
                                        <p className="font-medium text-sm capitalize">{x.name}</p>
                                    </div>
                                ))
                            }
                        </div></> || <h2 className="font-semibold">Aucun jeu à afficher</h2>
                    }
                </section>
                <div className="divider divider-horizontal"></div>
                <section className="flex flex-1 justify-start">
                    {data.posts.length && <div className="flex justify-between w-full">
                        <h2 className="font-semibold">Posts
                            <span className="ml-2 indicator indicator-item badge badge-outline">{data.posts.length}</span>
                        </h2>
                        <p>Voir tout</p>
                    </div> || <h2 className="font-semibold">Aucun post à afficher</h2>
                    }
                </section>
            </section>
        )
    }

    return (
        <section>
            <header className="relative flex py-4 flex-col items-center border-neutral border-b">
                <button onClick={handleLogout} className="btn btn-outline btn-accent absolute top-4 right-4">
                    <LuLogOut />
                </button>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={data.user.profilePicture} />
                    </div>
                </div>
                <h1 className="text-xl">@{data.user.pseudo}</h1>
                <p>Inscrit depuis le {dayjs(data.user.createdAt).format("DD MMM YYYY")}</p>
                <div className="flex gap-2 mt-2">
                    <button className="btn btn-outline btn-accent flex-1">Modifier</button>
                    {data.user.role === "ADMIN" && <button className="btn btn-outline btn-accent flex-1">Admin</button>}
                </div>
            </header>
            {content()}
        </section>
    )
}

export default ProfileScreen;
