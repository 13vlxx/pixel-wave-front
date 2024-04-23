import GamesCarousel from "@components/carousels/games.carousel";
import { LiteGameDto } from "@stores/home/home.model";
import HomeRequest from "@stores/home/home.request";
import { useEffect, useState } from "react";

const HomeScreen = () => {
    const [games, setGames] = useState<LiteGameDto[]>([]);

    useEffect(() => {
        HomeRequest.getHomepage().then((res) => {
            setGames(res);
        })
    });

    return (
        <div>
            <GamesCarousel title="Jeux du moment >" games={games} />
            <GamesCarousel title="Prochaines sorties >" games={games} />
        </div>
    );
}

export default HomeScreen;