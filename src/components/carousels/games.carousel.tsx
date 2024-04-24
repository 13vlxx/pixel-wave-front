import { LiteGameDto } from "@stores/home/home.model";
import { PagesUnauth } from "@utils/router/routes";
import { useResponsive } from "@utils/useResponsive";
import { IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface GamesCarouselProps {
    title: string;
    games: LiteGameDto[];
}

const GamesCarousel = (props: GamesCarouselProps) => {
    const { title, games } = props;
    const { isMobile } = useResponsive()
    const navigate = useNavigate()

    const handleNavigate = (destination: string) => {
        navigate(PagesUnauth.GAME + "/" + destination)
    }

    if (isMobile)
        return (
            <div className="mb-2">
                <h1 className="font-semibold text-lg px-4">{title}</h1>
                <div className="flex items-center py-2 gap-2 carousel pr-4">
                    {
                        games.map((x) => (
                            <div onClick={() => handleNavigate(x.name)} key={x.id} className="flex flex-col items-start justify-center carousel-item pl-4 hover:scale-110 transition-all cursor-pointer">
                                <img className="w-56 h-32 object-cover rounded-md" src={x.logo} alt={x.name} />
                                <p className="font-medium text-sm capitalize">{x.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )

    return (
        <div className="font-semibold px-4 max-w-6xl mx-auto pb-8">
            <h1 className="flex items-end font-semibold text-3xl pb-4">{title} <IoChevronForwardOutline /></h1>
            <div className="grid grid-cols-3 gap-4 gap-x-6">
                {
                    games.map((x) => (
                        <div onClick={() => handleNavigate(x.name)} key={x.id} className="cursor-pointer select-none hover:scale-105 transition-all duration-300">
                            <img className="object-cover rounded-md" src={x.logo} alt={x.name} />
                            <p className="font-medium text-sm capitalize">{x.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GamesCarousel;