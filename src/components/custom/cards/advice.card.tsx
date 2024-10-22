import { UserAvatar } from "@/components/custom/_utils/user.avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AdviceDto } from "@/stores/game/game.model";

interface AdviceCardProps {
  advice: AdviceDto;
  showGameName: boolean;
}

export const AdviceCard = (props: AdviceCardProps) => {
  const { advice, showGameName = true } = props;

  return (
    <Card className="w-[300px] select-none border-primary">
      <CardContent className="py-4">
        {<UserAvatar user={advice.user} />}
        {showGameName && <span className="capitalize font-bold">{advice.game.name}</span>}
        <p className="text-ellipsis overflow-hidden">{advice.advice}</p>
        <p className="text-ellipsis overflow-hidden text-end text-muted-foreground">{advice.note}/5</p>
      </CardContent>
    </Card>
  );
};
