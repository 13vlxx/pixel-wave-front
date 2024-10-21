import { Card, CardContent } from "@/components/ui/card";
import { GameDto } from "@/stores/game/game.model";

interface GameImageCardProps {
  game: GameDto;
}

export const GameImageCard = (props: GameImageCardProps) => {
  const { game } = props;

  return (
    <Card
      style={{
        backgroundImage: `url(${game.logo})`,
      }}
      className="mx-auto border-secondary w-2/3 max-sm:w-[90%] h-64 object-contain bg-cover bg-center bg-no-repeat rounded-lg shadow-md dark:border-primary dark:shadow-primary sm:min-w-[300px]"
    >
      <CardContent className="py-4"></CardContent>
    </Card>
  );
};
