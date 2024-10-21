import dayjs from "@/_utils/dayjs";
import { useResponsive } from "@/_utils/use-responsive";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdviceDto, GameDto } from "@/stores/game/game.model";
import { HearthGameButton } from "../_utils/hearth-game.button";
import { CategoryBadge } from "../badges/category.badge";
import { PlatformBadge } from "../badges/platform.badge";
import { AdviceCarousel } from "../carousels/advice-carousel";
import { GameMediaCarousel } from "../carousels/game-media.carousel";

interface GameInfoCardProps {
  game: GameDto;
  isFavorite: boolean;
  userAdvice?: AdviceDto | null;
  toggleFavorite: () => void;
  toggleAdvice?: () => void;
}

export const GameInfoCard = (props: GameInfoCardProps) => {
  const { game, isFavorite, userAdvice, toggleFavorite, toggleAdvice } = props;
  const { isMobile } = useResponsive();

  return (
    <Card className="mx-auto border-secondary w-2/3 max-sm:w-[90%] dark:border-primary dark:shadow-primary sm:min-w-[300px]">
      <CardContent className="py-4 space-y-2">
        <div className="flex justify-between w-full items-baseline">
          <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
            {game.name} <HearthGameButton isFavorite={isFavorite} onClick={toggleFavorite} />
          </h2>
          <p className="text-sm capitalize text-muted-foreground">{dayjs(game.releaseDate).format("DD MMMM YYYY")}</p>
        </div>
        <section className="space-x-2">
          {game.game_platform.map((platform) => (
            <PlatformBadge key={platform.platform.id} platformName={platform.platform.name} />
          ))}
        </section>
        <GameMediaCarousel media={game.media} />
        <section className="space-y-2">
          <h3 className="text-lg font-bold">Description</h3>
          <p className="text-sm">{game.description}</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-lg font-bold">Categories</h3>
          {game.game_category.map((category) => (
            <CategoryBadge key={category.category.id} categoryName={category.category.name} />
          ))}
        </section>
        {isMobile && (
          <Button onClick={toggleFavorite} className="w-full">
            {isFavorite ? "Retirer des favoris 💔" : "Ajouter aux favoris ❤️"}
          </Button>
        )}
        {!isMobile && (
          <section>
            {game.game_advice.length > 0 && (
              <>
                <h3 className="text-lg font-bold">Avis des joueurs</h3>
                <AdviceCarousel advices={game.game_advice} />
              </>
            )}
            <div className="flex gap-2">
              <Button onClick={toggleFavorite} className="flex-1">
                {isFavorite ? "Retirer des favoris 💔" : "Ajouter aux favoris ❤️"}
              </Button>
              <Button onClick={toggleAdvice} className="flex-1">
                {userAdvice ? "Modifier mon avis" : "Donner mon avis"}
              </Button>
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};
