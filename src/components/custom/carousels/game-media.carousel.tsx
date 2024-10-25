import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { MediaDto } from "@/stores/game/game.model";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

interface GameMediaCarouselProps {
  media: MediaDto[];
  onImageClick: (imageUrl: string) => void;
}

export const GameMediaCarousel = (props: GameMediaCarouselProps) => {
  const { media, onImageClick } = props;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full overflow-x-auto"
    >
      <CarouselContent>
        {media.map((x) => (
          <CarouselItem onClick={() => onImageClick(x.path)} key={x.id} className="basis-2/3 cursor-pointer">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
              <img src={x.path} alt="image" className="h-full w-full rounded-md object-cover" />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
