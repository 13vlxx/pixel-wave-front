import AdvicesCarousel from "@components/carousels/advices.carousel";
import CategoriesCarousel from "@components/carousels/categories.carousel";
import GamesCarousel from "@components/carousels/games.carousel";
import PlatformsCarousel from "@components/carousels/platforms.carousel";
import Footer from "@components/footer.component";
import { AdviceDto, CategoryDto, LiteGameDto, PlatformDto } from "@stores/home/home.model";
import HomeRequest from "@stores/home/home.request";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const HomeScreen = () => {
    const [games, setGames] = useState<LiteGameDto[]>([]);
    const [advices, setAdvices] = useState<AdviceDto[]>([]);
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [platforms, setPlatforms] = useState<PlatformDto[]>([]);

    useEffect(() => {
        HomeRequest.getHomepage().then((res) => {
            setGames(res.games);
            setAdvices(res.advices);
            setCategories(res.categories)
            setPlatforms(res.platforms);
        });
    }, []);

    return (
        <div className="mt-4">
            <GamesCarousel title="Jeux du moment" games={games} />
            <GamesCarousel title="Prochaines sorties" games={games} />
            <AdvicesCarousel advices={advices} />
            <div className="bg-neutral p-4 flex items-center justify-center flex-col gap-2 cursor-pointer">
                <p>Envie de discuter avec d'autres joueurs ?</p>
                <span className="link link-accent flex items-center gap-2">Consulter les posts <FaArrowRight /></span>
            </div>
            <CategoriesCarousel categories={categories} />
            <PlatformsCarousel platforms={platforms} />
            <p>Actualité</p>
            <Footer />
        </div>
    );
}

export default HomeScreen;