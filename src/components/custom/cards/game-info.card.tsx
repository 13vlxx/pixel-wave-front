import dayjs from "@/_utils/dayjs";
import { Card, CardContent } from "@/components/ui/card";
import { GameDto } from "@/stores/game/game.model";
import { PlatformBadge } from "../badges/platform.badge";

interface GameInfoCardProps {
  game: GameDto;
}

export const GameInfoCard = (props: GameInfoCardProps) => {
  const { game } = props;

  return (
    <Card className="mx-auto border-secondary w-2/3 max-sm:w-[90%] dark:border-primary dark:shadow-primary">
      <CardContent className="py-4">
        <div>
          <div className="flex justify-between w-full items-baseline">
            <h2 className="text-2xl font-bold capitalize">{game.name}</h2>
            <p className="text-sm capitalize text-foreground/40">{dayjs(game.releaseDate).format("DD MMMM YYYY")}</p>
          </div>
          <section className="mt-2 space-x-2">
            {game.game_platform.map((platform) => (
              <PlatformBadge key={platform.platform.id} platformName={platform.platform.name} />
            ))}
          </section>
        </div>
      </CardContent>
    </Card>
  );
};
