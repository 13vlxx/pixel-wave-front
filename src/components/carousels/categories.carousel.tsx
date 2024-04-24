import { CategoryDto } from "@stores/home/home.model";

interface CategoriesCarouselProps {
    categories: CategoryDto[]
}

const CategoriesCarousel = (props: CategoriesCarouselProps) => {
    const { categories } = props

    return (
        <div className="my-2">
            <h1 className="font-semibold text-lg pb-2 px-4">Catégories</h1>
            <div className="flex items-center gap-2 carousel py-2 pr-4">
                {
                    categories.map((x) => (
                        <div key={x.id} className="flex flex-col items-start justify-center carousel-item pl-4 hover:scale-110 transition-all cursor-pointer">
                            <img className="w-56 h-32 object-cover rounded-md" src={x.logo} alt={x.name} />
                            <p className="font-medium text-sm capitalize">{x.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default CategoriesCarousel;