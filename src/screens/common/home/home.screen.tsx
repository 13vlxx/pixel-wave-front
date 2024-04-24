import AdvicesCarousel from "@components/carousels/advices.carousel";
import GamesCarousel from "@components/carousels/games.carousel";
import { AdviceDto, LiteGameDto } from "@stores/home/home.model";
import HomeRequest from "@stores/home/home.request";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const HomeScreen = () => {
    const [games, setGames] = useState<LiteGameDto[]>([]);
    const [advices, setAdvices] = useState<AdviceDto[]>([]);

    useEffect(() => {
        HomeRequest.getHomepage().then((res) => {
            setGames(res.games);
            setAdvices(res.advices);
        });
    }, []);

    return (
        <div>
            <GamesCarousel title="Jeux du moment >" games={games} />
            <GamesCarousel title="Prochaines sorties >" games={games} />
            <AdvicesCarousel advices={advices} />
            <div className="bg-neutral p-4 flex items-center justify-center flex-col gap-2 cursor-pointer">
                <p>Envie de discuter avec d'autres joueurs ?</p>
                <span className="link link-accent flex items-center gap-2">Consulter les posts <FaArrowRight /></span>
            </div>
        </div>
    );
}

export default HomeScreen;