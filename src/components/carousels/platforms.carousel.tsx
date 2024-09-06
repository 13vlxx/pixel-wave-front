import { PlatformDto } from "@stores/game/game.model";
import { useResponsive } from "@utils/useResponsive";

interface PlatformsCarouselProps {
  platforms: PlatformDto[];
}

const PlatformsCarousel = (props: PlatformsCarouselProps) => {
  const { platforms } = props;
  const { isMobile } = useResponsive();

  if (isMobile)
    return (
      <div className="my-2">
        <h1 className="font-semibold text-lg pb-2 px-4">Plateformes</h1>
        <div className="flex items-center py-2 gap-2 carousel pr-4">
          {platforms.map((x) => (
            <div
              key={x.id}
              className="flex flex-col items-start justify-center carousel-item pl-4 hover:scale-110 transition-all cursor-pointer"
            >
              <img
                className="w-56 h-32 object-cover rounded-md"
                src={x.image}
                alt={x.name}
              />
              <p className="font-medium text-sm capitalize">{x.name}</p>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="font-semibold px-4 max-w-6xl mx-auto pb-8">
      <h1 className="font-semibold text-3xl pb-4">Plateformes</h1>
      <div className="grid grid-cols-3 gap-4 gap-x-6">
        {platforms.map((x) => (
          <div
            key={x.id}
            className="flex flex-col items-start justify-center carousel-item hover:scale-105 transition-all cursor-pointer"
          >
            <img
              className="size-full object-cover rounded-md"
              src={x.image}
              alt={x.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformsCarousel;
