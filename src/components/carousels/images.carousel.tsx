import { useState } from "react";

interface ImagesCarouselProps {
    title: string
    images: string[]
}

const ImagesCarousel = (props: ImagesCarouselProps) => {
    const { title, images } = props

    const [photo, setPhoto] = useState<string | null>(null);
    console.log(photo);

    const handlePhotoClick = (photo: string) => setPhoto(photo);

    return (
        <>
            <div className="mb-2">
                <h1 className="font-semibold text-lg px-4">{title}</h1>
                <div className="flex items-center py-2 gap-2 carousel pr-4">
                    {
                        images.map((x, i) => (
                            <div key={i} className="carousel-item pl-4 cursor-pointer">
                                <img onClick={() => handlePhotoClick(x)} className="w-56 h-32 object-cover rounded-md" src={x} alt="image" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default ImagesCarousel;