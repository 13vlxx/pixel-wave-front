import AdvicesCarousel from "@components/carousels/advices.carousel";
import ImagesCarousel from "@components/carousels/images.carousel";
import GameAdviceForm from "@components/forms/game/game-advice.form";
import NewsList from "@components/lists/news.list";
import AdviceRequest from "@stores/advice/advice.request";
import { useAuthStore } from "@stores/auth/auth.store";
import { AdviceDto, GameDto } from "@stores/game/game.model";
import GameRequest from "@stores/game/game.request";
import { useResponsive } from "@utils/useResponsive";
import { useEffect, useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { MdOutlineIosShare } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const GameDetailsScreen = () => {
    const { name } = useParams();
    const { isMobile } = useResponsive();
    const [game, setGame] = useState<GameDto>();
    const [showAdviceSection, setShowAdviceSection] = useState(false);
    const [alreadyPostedAdvice, setAlreadyPostedAdvice] = useState<AdviceDto | null>(null);
    const { token } = useAuthStore();

    useEffect(() => {
        GameRequest.getGameDetails(name!).then(setGame)
    }, [name]);

    useEffect(() => {
        if (game) {
            AdviceRequest.checkIfAlreadyPostedAdvice(game.id).then((x) => setAlreadyPostedAdvice(x))
        }
    });

    const handleShowAdviceSection = () => setShowAdviceSection(true);

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

    if (!game) return <h1>Game not found</h1>;

    if (isMobile)
        return (
            <div>
                <img className="w-full max-h-72 object-cover" src={game.logo} alt="game logo" />
                <div className="px-4 flex items-center mt-1 gap-2">
                    <h1 className="text-2xl font-bold flex-1 overflow-hidden">{game.name}</h1>
                    {token && <HiMiniPencilSquare className="size-8" />}
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

    const LeftSide = (
        <>
            <h1 className="text-2xl font-bold flex-1 overflow-hidden">{game.name}</h1>
            <img className="w-full object-cover rounded-lg" src={game.logo} alt="game logo" />
            <div className="flex items-center mt-1 gap-2">
                <h1 className="text-2xl font-bold flex-1 overflow-hidden">{game.name}</h1>
                {token && <HiMiniPencilSquare onClick={handleShowAdviceSection} className="size-8 cursor-pointer" />}
                <MdOutlineIosShare onClick={handleShareGame} className="size-8 cursor-pointer" />
            </div>
            <div>
                <div className="w-full h-px bg-neutral mt-1" />
            </div>
            <ImagesCarousel images={game.media.map((x) => x.path)} />
            <div className="flex flex-col gap-2 mb-2">
                <div>
                    <h1 className="font-semibold text-lg">Description</h1>
                    <p className="">{game.description}</p>
                </div>
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
        </>
    )

    const RightSide = (
        <div className="w-full overflow-hidden">
            <h1 className="text-lg font-bold flex-1 overflow-hidden">Avis des joueurs</h1>
            <div className="grid grid-cols-2 gap-4 mb-2 flex-wrap">
                {
                    game.game_advice.map((x) => (
                        <div key={x.user.id + x.game.id}
                            className="overflow-scroll min-w-[100px] text-center bg-neutral flex-col max-h-[200px] items-center rounded-md p-2 justify-start">
                            <div className="avatar">
                                <div className="size-12 rounded-full">
                                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-ellipsis">{x.note}/20</p>
                                <p className="text-[12px] text-ellipsis line-clamp-2">{x.advice}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <NewsList title={`Dernières actualitées concernant ${game.name}`} news={game.news} />
        </div>
    )

    return (
        <div className="flex w-4/5 mx-auto mt-2">
            <div className="flex-1">
                {LeftSide}
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex-1 mt-2">
                {showAdviceSection ? <GameAdviceForm game={game} handleClose={() => setShowAdviceSection(false)} advice={alreadyPostedAdvice} /> : RightSide}
            </div>
        </div>
    )
}

export default GameDetailsScreen;