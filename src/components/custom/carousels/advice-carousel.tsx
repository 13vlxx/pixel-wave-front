import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AdviceDto } from "@/stores/game/game.model";
import { AdviceCard } from "../cards/advice.card";

export interface GameCarouselProps {
  advices: AdviceDto[];
}

export function AdviceCarousel(props: GameCarouselProps) {
  const { title, advices } = props;
  return (
    <section>
      <h1 className="font-semibold text-lg px-4">{title}</h1>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 py-2 px-4">
          {advices.map((x) => (
            <AdviceCard key={x.user.id + x.game.id} advice={x} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
