import { GameCarousel } from "@/components/custom/carousels/game.carousel";
import { AdviceDto, CategoryDto, LiteGameDto, PlatformDto } from "@/stores/game/game.model";
import HomeRequest from "@/stores/home/home.request";
import { useEffect, useState } from "react";

export const HomeScreen = () => {
  const [games, setGames] = useState<LiteGameDto[]>([]);
  const [advices, setAdvices] = useState<AdviceDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [platforms, setPlatforms] = useState<PlatformDto[]>([]);

  useEffect(() => {
    HomeRequest.getHomepage().then((res) => {
      setGames(res.games);
      setAdvices(res.advices);
      setCategories(res.categories);
      setPlatforms(res.platforms);
    });
  }, []);

  return (
    <section className="mt-4">
      <GameCarousel title="Jeux du moment" games={games} />
    </section>
  );
};
