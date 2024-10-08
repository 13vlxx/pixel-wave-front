import { AdviceDto } from "@stores/game/game.model";
import { useResponsive } from "@utils/useResponsive";
import { Link } from "react-router-dom";

interface AdvicesCarouselProps {
  hideGameName?: boolean;
  advices: AdviceDto[];
}

const AdvicesCarousel = (props: AdvicesCarouselProps) => {
  const { hideGameName, advices } = props;
  const { isMobile } = useResponsive();

  if (isMobile)
    return (
      <div className="mb-4">
        <h1 className="font-semibold text-lg pb-2 pl-4">Avis des joueurs</h1>
        <div className="carousel flex">
          <div className="carousel-item"></div>
          {advices.length ? (
            advices.map((x) => (
              <div
                key={x.user.id + x.game.id}
                className="ml-4 overflow-scroll carousel-item text-center bg-neutral w-1/2 max-w-[200px] flex flex-col max-h-[200px] items-center rounded-md p-2 justify-center"
              >
                <Link to={`/profile/${x.user.id}`} className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={x.user.profilePicture || "/default-pfp.jpeg"} />
                  </div>
                </Link>
                <div>
                  <p className="text-sm text-ellipsis">{x.note}/5</p>
                  {!hideGameName && (
                    <p className="text-sm capitalize text-ellipsis line-clamp-1">
                      {x.game.name}
                    </p>
                  )}
                  <p className="text-[12px] text-ellipsis line-clamp-2">
                    {x.advice}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span className="px-4">Aucun avis pour l'instant</span>
          )}
          <div className="carousel-item ml-4"></div>
        </div>
      </div>
    );

  return (
    <div className="font-semibold px-4 max-w-6xl mx-auto pb-8">
      <h1 className="font-semibold text-3xl pb-4">Avis des joueurs</h1>
      <div className="grid grid-cols-5 gap-8">
        {advices.map((x) => (
          <div
            key={x.user.id + x.game.id}
            className="overflow-scroll text-center bg-neutral flex flex-col max-h-[200px] items-center rounded-md p-2 justify-center"
          >
            <Link to={`/profile/${x.user.id}`} className="avatar">
              <div className="w-12 rounded-full">
                <img src={x.user.profilePicture || "/default-pfp.jpeg"} />
              </div>
            </Link>
            <div>
              <p className="text-sm text-ellipsis">{x.note}/5</p>
              {!hideGameName && (
                <p className="text-sm capitalize text-ellipsis line-clamp-1">
                  {x.game.name}
                </p>
              )}
              <p className="text-[12px] text-ellipsis line-clamp-2">
                {x.advice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvicesCarousel;
