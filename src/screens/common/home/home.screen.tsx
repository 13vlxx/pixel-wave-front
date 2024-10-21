import { PostsBanner } from "@/components/custom/_utils/posts.banner";
import { AdviceCarousel } from "@/components/custom/carousels/advice-carousel";
import { CategoryCarousel } from "@/components/custom/carousels/category-carousel";
import { GameCarousel } from "@/components/custom/carousels/game-carousel";
import { PlatformCarousel } from "@/components/custom/carousels/platform-carousel";
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
    <section className="mt-4 space-y-4">
      <GameCarousel title="Jeux du moment" games={games} />
      <GameCarousel title="Prochaines sorties" games={games} />
      <AdviceCarousel padding advices={advices} />
      <PostsBanner />
      <CategoryCarousel title="Categories" categories={categories} />
      <PlatformCarousel title="Plateformes" platforms={platforms} />
    </section>
  );
};
