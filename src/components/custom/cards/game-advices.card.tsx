import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdviceDto } from "@/stores/game/game.model";
import { AdviceCarousel } from "../carousels/advice-carousel";

interface GameAdvicesCard {
  advices: AdviceDto[];
  userAdvice: AdviceDto | null;
  toggleAdvice: () => void;
}

export const GameAdvicesCard = (props: GameAdvicesCard) => {
  const { advices, userAdvice, toggleAdvice } = props;

  return (
    <Card className="mx-auto border-secondary w-2/3 max-sm:w-[90%] sm:min-w-[300px]">
      <CardContent className="py-4 space-y-2">
        <h3 className="text-lg font-bold">{advices.length > 0 ? "Avis des joueurs" : "Aucun avis"}</h3>
        <AdviceCarousel advices={advices} showGameName={false} />
        <Button onClick={toggleAdvice} className="w-full">
          {userAdvice ? "Modifier mon avis" : "Donner mon avis"}
        </Button>
      </CardContent>
    </Card>
  );
};
