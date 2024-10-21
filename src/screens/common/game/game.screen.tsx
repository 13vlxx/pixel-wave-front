import { useResponsive } from "@/_utils/use-responsive";
import { GameAdvicesCard } from "@/components/custom/cards/game-advices.card";
import { GameImageCard } from "@/components/custom/cards/game-image.card";
import { GameInfoCard } from "@/components/custom/cards/game-info.card";
import { AdviceModal } from "@/components/custom/modals/advice.modal";
import AdviceRequest from "@/stores/advice/advice.request";
import { useAuthStore } from "@/stores/auth/auth.store";
import { AdviceDto, GameDto } from "@/stores/game/game.model";
import GameRequest from "@/stores/game/game.request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const GameScreen = () => {
  const { name } = useParams();
  const { isMobile } = useResponsive();
  const [game, setGame] = useState<GameDto | null>(null);
  const [alreadyPostedAdvice, setAlreadyPostedAdvice] = useState<AdviceDto | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAdviceModal, setShowAdviceModal] = useState(false);
  const { token, toggleModal } = useAuthStore();

  useEffect(() => {
    document.title = `Pixel Wave | ${name?.slice(0, 1).toUpperCase()}${name?.slice(1)}`;
    GameRequest.getGameDetails(name!).then(setGame);
  }, [name, showAdviceModal]);

  useEffect(() => {
    if (game && token) {
      AdviceRequest.checkIfAlreadyPostedAdvice(game.id).then((x) => setAlreadyPostedAdvice(x));
      GameRequest.checkIfFavorite(game.id).then(setIsFavorite);
    }
  }, [game, token]);

  const handleToggleFavorite = () => {
    if (token)
      GameRequest.toggleFavorite(game!.id).then((x) => {
        setIsFavorite(x);
        toast.success(x ? "Jeu ajouté aux favoris" : "Jeu supprimé des favoris");
      });
    else toggleModal();
  };

  const handleToggleAdviceModal = () => {
    if (token) setShowAdviceModal(true);
    else toggleModal();
  };

  if (game && isMobile)
    return (
      <>
        <section className="relative mb-8">
          <img src={game.logo} alt={game.name} className="w-full object-cover max-h-96 blur-sm" />
          <div className="absolute w-full -translate-y-1/2">
            <GameImageCard game={game} />
          </div>
          <div className="pt-36 space-y-4">
            <GameInfoCard game={game} isFavorite={isFavorite} toggleFavorite={handleToggleFavorite} />
            <GameAdvicesCard advices={game.game_advice} userAdvice={alreadyPostedAdvice} toggleAdvice={handleToggleAdviceModal} />
          </div>
        </section>
        <AdviceModal isOpen={showAdviceModal} game={game} advice={alreadyPostedAdvice} onClose={() => setShowAdviceModal(false)} />
      </>
    );

  if (game)
    return (
      <>
        <section className="relative mb-36 min-h-[80dvh]">
          <img src={game.logo} alt={game.name} className="w-full object-cover max-h-96 blur-sm" />
          <section className="absolute -translate-y-72">
            <section className="flex justify-center gap-8 px-20 w-screen">
              <GameImageCard game={game} />
              <GameInfoCard
                game={game}
                isFavorite={isFavorite}
                toggleFavorite={handleToggleFavorite}
                userAdvice={alreadyPostedAdvice}
                toggleAdvice={handleToggleAdviceModal}
              />
            </section>
          </section>
        </section>
        <AdviceModal isOpen={showAdviceModal} game={game} advice={alreadyPostedAdvice} onClose={() => setShowAdviceModal(false)} />
      </>
    );
};
