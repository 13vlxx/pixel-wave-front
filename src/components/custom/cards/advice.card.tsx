import { UserAvatar } from "@/components/custom/_utils/user.avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AdviceDto } from "@/stores/game/game.model";

interface AdviceCardProps {
  advice: AdviceDto;
}

export const AdviceCard = (props: AdviceCardProps) => {
  const { advice } = props;
  console.log(advice.game.logo);
  return (
    <Card className="w-[300px] h-[120px]">
      <CardContent className="py-4">
        {<UserAvatar user={advice.user} />}
        <span className="capitalize font-bold">{advice.game.name}</span>
        <p className="text-ellipsis overflow-hidden">{advice.advice}</p>
      </CardContent>
    </Card>
  );
};
