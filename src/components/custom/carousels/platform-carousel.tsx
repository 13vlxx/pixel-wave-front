import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PlatformDto } from "@/stores/game/game.model";
import { Link } from "react-router-dom";

export interface CategoryCarouselProps {
  title: string;
  platforms: PlatformDto[];
}

export function PlatformCarousel(props: CategoryCarouselProps) {
  const { title, platforms } = props;
  return (
    <section>
      <h1 className="font-semibold text-lg px-4">{title}</h1>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 py-2 px-4">
          {platforms.map((x) => (
            <Link to={`/platform/${x.name}`} key={x.id} className="flex flex-col items-start justify-center hover:scale-105 transition-all cursor-pointer">
              <img className="w-56 h-32 object-cover rounded-md" src={x.image} alt={x.name} />
              <p className="font-medium text-sm capitalize">{x.name}</p>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
