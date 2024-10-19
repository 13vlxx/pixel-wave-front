import dayjs from "@/_utils/dayjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GameDto } from "@/stores/game/game.model";
import { HearthGameButton } from "../_utils/hearth-game.button";
import { CategoryBadge } from "../badges/category.badge";
import { PlatformBadge } from "../badges/platform.badge";
import { GameMediaCarousel } from "../carousels/game-media.carousel";

interface GameInfoCardProps {
  game: GameDto;
  isFavorite: boolean;
  toggleFavorite: () => void;
}

export const GameInfoCard = (props: GameInfoCardProps) => {
  const { game, isFavorite, toggleFavorite } = props;

  return (
    <Card className="mx-auto border-secondary w-2/3 max-sm:w-[90%] dark:border-primary dark:shadow-primary">
      <CardContent className="py-4 space-y-2">
        <div className="flex justify-between w-full items-baseline">
          <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
            {game.name} <HearthGameButton isFavorite={isFavorite} onClick={toggleFavorite} />
          </h2>
          <p className="text-sm capitalize text-foreground/40">{dayjs(game.releaseDate).format("DD MMMM YYYY")}</p>
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
        <section className="flex gap-2">
          <Button className="flex-1">Voir les avis ({game.game_advice.length})</Button>
        </section>
      </CardContent>
    </Card>
  );
};
