import { LiteGameDto } from "@stores/home/home.model";

interface GamesCarouselProps {
    title: string;
    games: LiteGameDto[];
}

const GamesCarousel = (props: GamesCarouselProps) => {
    const { title, games } = props;

    return (
        <div className="mb-2">
            <h1 className="overflow-hidden font-semibold text-lg pb-2 px-4">{title}</h1>
            <div className="flex items-center py-2 gap-2 carousel pr-4">
                {
                    games.map((x) => (
                        <div key={x.id} className="flex flex-col items-start justify-center carousel-item pl-4 hover:scale-110 transition-all cursor-pointer">
                            <img className="w-56 h-32 object-cover rounded-md" src={x.logo} alt={x.name} />
                            <p className="font-medium text-sm">{x.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GamesCarousel;