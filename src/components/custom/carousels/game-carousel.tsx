import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { LiteGameDto } from "@/stores/game/game.model";
import { Link } from "react-router-dom";

export interface GameCarouselProps {
  title: string;
  games: LiteGameDto[];
  hideGameName?: boolean;
  displayInGrid?: boolean;
}

export const GameCarousel = (props: GameCarouselProps) => {
  const { title, games, hideGameName = false, displayInGrid = false } = props;

  if (displayInGrid)
    return (
      <section className="px-4">
        <h1 className="font-semibold text-lg px-4">{title}</h1>
        <section className="grid gap-4 grid-cols-3 max-lg:grid-cols-2 min-w-[300px]">
          {games.map((x) => (
            <Link to={`/game/${x.name}`} key={x.id} className="flex flex-col items-start justify-center hover:scale-105 transition-all cursor-pointer">
              <img
                className="w-56 h-32 object-cover rounded-md"
                src={
                  x.logo === "default"
                    ? "https://gaming-cdn.com/images/products/16007/380x218/elden-ring-edition-l-ombre-de-l-arbre-monde-shadow-of-the-erdtree-edition-pc-jeu-steam-europe-cover.jpg?v=1715598000"
                    : x.logo
                }
                alt={x.name}
              />
              {!hideGameName && <p className="font-medium text-sm capitalize">{x.name}</p>}
            </Link>
          ))}
        </section>
      </section>
    );

  return (
    <section>
      <h1 className="font-semibold text-lg px-4">{title}</h1>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex w-max space-x-4 py-2 px-4">
          {games.map((x) => (
            <Link to={`/game/${x.name}`} key={x.id} className="flex flex-col items-start justify-center hover:scale-105 transition-all cursor-pointer">
              <img
                className="w-56 h-32 object-cover rounded-md"
                src={
                  x.logo === "default"
                    ? "https://gaming-cdn.com/images/products/16007/380x218/elden-ring-edition-l-ombre-de-l-arbre-monde-shadow-of-the-erdtree-edition-pc-jeu-steam-europe-cover.jpg?v=1715598000"
                    : x.logo
                }
                alt={x.name}
              />
              {!hideGameName && <p className="font-medium text-sm capitalize">{x.name}</p>}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
