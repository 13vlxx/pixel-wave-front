import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AdviceDto } from "@/stores/game/game.model";
import { AdviceCard } from "../cards/advice.card";

export interface GameCarouselProps {
  advices: AdviceDto[];
  padding?: boolean;
  showGameName?: boolean;
}

export function AdviceCarousel(props: GameCarouselProps) {
  const { advices, padding, showGameName = true } = props;
  return (
    <section>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className={`flex w-max space-x-4 py-2 ${padding && "px-4"}`}>
          {advices.map((x) => (
            <AdviceCard key={x.user.id + x.game.id} advice={x} showGameName={showGameName} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
