import { LiteGameDto } from "@stores/home/home.model";

interface GamesCarouselProps {
    title: string;
    games: LiteGameDto[];
}

const GamesCarousel = (props: GamesCarouselProps) => {
    const { title, games } = props;

    return (
        <div className="mb-4">
            <h1 className="font-semibold text-lg pb-2">{title}</h1>
            <div className="flex items-center gap-8 carousel">
                {
                    games.map(x => (
                        <div key={x.id} className="flex flex-col items-start justify-center carousel-item">
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