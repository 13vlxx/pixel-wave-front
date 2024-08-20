import GamesCarousel from "@components/carousels/games.carousel";
import PostsList from "@components/lists/posts.list";
import Verified from "@components/verified.component";
import { GetUserProfileDto } from "@stores/user/user.model";
import UserRequest from "@stores/user/user.request";
import { useUserStore } from "@stores/user/user.store";
import { useResponsive } from "@utils/useResponsive";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ProfileByIdScreen = () => {
    const { userId } = useParams()
    const { id } = useUserStore()
    const { isMobile } = useResponsive();
    const [user, setUser] = useState<GetUserProfileDto | null>()

    useEffect(() => {
        document.title = `Pixel Wave | ${user?.user.pseudo}`;
        if (id === userId) window.location.href = "/profile/me"
    }, [id, userId, user?.user.pseudo]);

    useEffect(() => {
        UserRequest.getUserById(userId!).then(setUser)
    }, [userId]);

    if (!user) return <h1 className="mx-auto block mt-4 px-4">Utilisateur introuvable</h1>

    const content = () => {

        if (isMobile)
            return (
                <>
                    {
                        user.favoriteGames.length && <><div className="px-4 flex justify-between w-full pt-2">
                            <h2 className="font-semibold text-lg">Jeux Favoris
                                <span className="ml-2 indicator indicator-item badge badge-outline">{user.favoriteGames.length}</span>
                            </h2>
                            <p>Voir tout</p>
                        </div>
                            <GamesCarousel games={user.favoriteGames} />
                        </> || <h2 className="font-semibold text-lg px-4">Aucun jeu a afficher</h2>
                    }
                    <section className="px-4 w-full pt-2 flex flex-col gap-2">
                        {user.posts.length &&
                            <>
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold text-lg">Posts
                                        <span className="ml-2 indicator indicator-item badge badge-outline">{user.posts.length}</span>
                                    </h2>
                                    <p>Voir tout</p>
                                </div>
                                {<PostsList posts={user.posts} />}
                            </> || null
                        }
                    </section></>
            )

        return (
            <section className="flex w-full px-4">
                <section className="flex flex-1 flex-col gap-2">
                    {user.favoriteGames.length && <><div className="flex justify-between w-full">
                        <h2 className="font-semibold">Jeux Favoris
                            <span className="ml-2 indicator indicator-item badge badge-outline">{user.favoriteGames.length}</span>
                        </h2>
                        <p>Voir tout</p>
                    </div>
                        <div className="grid grid-cols-2 gap-4 gap-x-6">
                            {
                                user.favoriteGames.map((x) => (
                                    <Link to={`/game/${x.name}`} key={x.id} className="cursor-pointer select-none hover:scale-105 transition-all duration-300">
                                        <img className="object-cover rounded-md" src={x.logo === "default" ? "https://gaming-cdn.com/images/products/16007/380x218/elden-ring-edition-l-ombre-de-l-arbre-monde-shadow-of-the-erdtree-edition-pc-jeu-steam-europe-cover.jpg?v=1715598000" : x.logo} alt={x.name} />
                                        <p className="font-medium text-sm capitalize">{x.name}</p>
                                    </Link>
                                ))
                            }
                        </div></> || <h2 className="font-semibold">Aucun jeu à afficher</h2>
                    }
                </section>
                <div className="divider divider-horizontal"></div>
                <section className="flex flex-1 justify-start">
                    {user.posts.length && <div className="flex justify-between w-full">
                        <h2 className="font-semibold">Posts
                            <span className="ml-2 indicator indicator-item badge badge-outline">{user.posts.length}</span>
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
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={user.user.profilePicture || "/default-pfp.jpeg"} />
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <h1 className="flex items-baseline text-xl">@{user.user.pseudo}</h1>
                    <Verified role={user.user.role} />
                </div>
                <p>Inscrit depuis le {dayjs(user.user.createdAt).format("DD MMM YYYY")}</p>
            </header>
            {content()}
        </section>
    )
}

export default ProfileByIdScreen;