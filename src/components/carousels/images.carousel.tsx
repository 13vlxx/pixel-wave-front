interface ImagesCarouselProps {
    title: string
    images: string[]
}

const ImagesCarousel = (props: ImagesCarouselProps) => {
    const { title, images } = props

    return (
        <div className="mb-2">
            <h1 className="font-semibold text-lg px-4">{title}</h1>
            <div className="flex items-center py-2 gap-2 carousel pr-4">
                {
                    images.map((x, i) => (
                        <div key={i} className="flex flex-col items-start justify-center carousel-item pl-4 cursor-pointer">
                            <img className="w-56 h-32 object-cover rounded-md" src={x} alt="image" />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ImagesCarousel;