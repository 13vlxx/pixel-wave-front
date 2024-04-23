import AdvicesCarousel from "@components/carousels/advices.carousel";
import GamesCarousel from "@components/carousels/games.carousel";
import { AdviceDto, LiteGameDto } from "@stores/home/home.model";
import HomeRequest from "@stores/home/home.request";
import { useEffect, useState } from "react";

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
        </div>
    );
}

export default HomeScreen;