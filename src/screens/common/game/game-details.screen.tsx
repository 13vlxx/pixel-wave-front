import AdvicesCarousel from "@components/carousels/advices.carousel";
import ImagesCarousel from "@components/carousels/images.carousel";
import NewsList from "@components/lists/news.list";
import { GameDto } from "@stores/game/game.model";
import GameRequest from "@stores/game/game.request";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { MdOutlineIosShare } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const GameDetailsScreen = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState<GameDto>();

    useEffect(() => {
        GameRequest.getGameDetails(name!).then(setGame).catch(() => navigate('/'));
    }, [name, navigate]);

    const handleShareGame = () => {
        if (navigator.share) {
            navigator.share({
                title: game?.name,
                text: game?.description,
                url: window.location.href
            }).then(() => toast.success('Jeu partagé avec succès'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => toast.success('Lien copié avec succès'))
                .catch((error) => console.log('Error copying link', error));
        }
    }

    if (game)
        return (
            <div className="overflow-hidden">
                <img className="w-full max-h-72 object-cover" src={game.logo} alt="game logo" />
                <div className="px-4 flex items-center mt-1 gap-2">
                    <h1 className="text-2xl font-bold flex-1 overflow-hidden">{game.name}</h1>
                    <IoStar className="size-8" />
                    <MdOutlineIosShare onClick={handleShareGame} className="size-8" />
                </div>
                <div className="px-4">
                    <div className="w-full h-px bg-neutral mt-1" />
                </div>
                <ImagesCarousel title="Images" images={game.media.map((x) => x.path)} />
                <div className="px-4 flex flex-col gap-2 mb-2">
                    <div>
                        <h1 className="font-semibold text-lg">Description</h1>
                        <p className="">{game.description}</p>
                    </div>
                    <div>
                        <h1 className="font-semibold text-lg">Disponible sur :</h1>
                        <div className="flex gap-1 mt-1">
                            {
                                game.game_platform.map((x) => (
                                    <p key={x.platform.id} className="badge badge-outline badge-lg badge-accent bg-neutral uppercase">{x.platform.name}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <AdvicesCarousel hideGameName advices={game.game_advice} />
                <div className="px-4">
                    <NewsList title={`Dernières actualitées concernant ${game.name}`} news={game.news} />
                </div>
            </div>
        )
}

export default GameDetailsScreen;