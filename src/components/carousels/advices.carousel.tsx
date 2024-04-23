import { AdviceDto } from "@stores/home/home.model";

interface AdvicesCarouselProps {
    advices: AdviceDto[];
}

const AdvicesCarousel = (props: AdvicesCarouselProps) => {
    const { advices } = props;

    return (
        <div className="mb-4">
            <h1 className="font-semibold text-lg pb-2">Avis des joueurs</h1>
            <div className="gap-8 carousel">
                {
                    advices.map((x) => (
                        <div key={x.user.id + x.game.id} className="carousel-item overflow-scroll text-center bg-neutral m-0 w-1/2 flex flex-col max-h-[200px] maxh items-center rounded-md p-2">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-ellipsis">{x.note}/20</p>
                                <p className="text-sm text-ellipsis">{x.game.name}</p>
                                <p className="text-sm">{x.advice}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AdvicesCarousel;