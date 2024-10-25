import dayjs from "@/_utils/dayjs";
import { useResponsive } from "@/_utils/use-responsive";
import { CategoryBadge } from "@/components/custom/badges/category.badge";
import { PlatformBadge } from "@/components/custom/badges/platform.badge";
import { AdviceCarousel } from "@/components/custom/carousels/advice-carousel";
import { GameMediaCarousel } from "@/components/custom/carousels/game-media.carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdviceDto, GameDto } from "@/stores/game/game.model";
import { HearthGameButton } from "../_utils/hearth-game.button";

interface GameInfoCardProps {
  game: GameDto;
  isFavorite: boolean;
  userAdvice?: AdviceDto | null;
  toggleFavorite: () => void;
  onImageClick: (imageUrl: string) => void;
  toggleAdvice?: () => void;
}

export const GameInfoCard = (props: GameInfoCardProps) => {
  const { game, isFavorite, userAdvice, toggleFavorite, onImageClick, toggleAdvice } = props;
  const { isMobile } = useResponsive();

  return (
    <Card className="mx-auto border-secondary w-2/3 max-sm:w-[90%] sm:min-w-[300px]">
      <CardContent className="py-4 space-y-2">
        <div className="flex justify-between w-full items-top">
          <div>
            <h2 className="text-2xl font-bold capitalize flex items-center gap-2">{game.name}</h2>
            <p className="text-sm capitalize text-muted-foreground">{dayjs(game.releaseDate).format("DD MMMM YYYY")}</p>
          </div>
          <HearthGameButton isFavorite={isFavorite} onClick={toggleFavorite} />
        </div>
        <section className="space-x-2">
          {game.game_platform.map((platform) => (
            <PlatformBadge key={platform.platform.id} platformName={platform.platform.name} />
          ))}
        </section>
        <GameMediaCarousel media={game.media} onImageClick={(x) => onImageClick(x)} />
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
        {!isMobile && (
          <section>
            {game.game_advice.length > 0 && (
              <>
                <h3 className="text-lg font-bold">Avis des joueurs</h3>
                <AdviceCarousel advices={game.game_advice} showGameName={false} />
              </>
            )}
            <div className="flex gap-2">
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
