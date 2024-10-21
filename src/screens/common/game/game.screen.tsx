import { useResponsive } from "@/_utils/use-responsive";
import { GameAdvicesCard } from "@/components/custom/cards/game-advices.card";
import { GameImageCard } from "@/components/custom/cards/game-image.card";
import { GameInfoCard } from "@/components/custom/cards/game-info.card";
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
  const [showAdviceSection, setShowAdviceSection] = useState(false);
  const [alreadyPostedAdvice, setAlreadyPostedAdvice] = useState<AdviceDto | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { token, toggleModal } = useAuthStore();

  useEffect(() => {
    document.title = `Pixel Wave | ${name?.slice(0, 1).toUpperCase()}${name?.slice(1)}`;
    GameRequest.getGameDetails(name!).then(setGame);
  }, [name, showAdviceSection]);

  useEffect(() => {
    if (game && token) {
      AdviceRequest.checkIfAlreadyPostedAdvice(game.id).then((x) => setAlreadyPostedAdvice(x));
      GameRequest.checkIfFavorite(game.id).then(setIsFavorite);
    }
  }, [showAdviceSection, game, token]);

  const handleToggleFavorite = () => {
    if (token)
      GameRequest.toggleFavorite(game!.id).then((x) => {
        setIsFavorite(x);
        toast.success(x ? "Jeu ajouté aux favoris" : "jeu supprimé des favoris");
      });
    else toggleModal();
  };

  if (game && isMobile)
    return (
      <section className="relative mb-8">
        <img src={game.logo} alt={game.name} className="w-full object-cover max-h-96 blur-sm" />
        <div className="absolute w-full -translate-y-1/2">
          <GameImageCard game={game} />
        </div>
        <div className="pt-36 space-y-4">
          <GameInfoCard game={game} isFavorite={isFavorite} toggleFavorite={handleToggleFavorite} />
          <GameAdvicesCard advices={game.game_advice} userAdvice={alreadyPostedAdvice} />
        </div>
      </section>
    );

  if (game)
    return (
      <section className="relative mb-36 min-h-[88dvh]">
        <img src={game.logo} alt={game.name} className="w-full object-cover max-h-96 blur-sm" />
        <section className="absolute -translate-y-1/3">
          <section className="flex justify-center gap-8 px-20 w-screen">
            <GameImageCard game={game} />
            <GameInfoCard game={game} isFavorite={isFavorite} toggleFavorite={handleToggleFavorite} userAdvice={alreadyPostedAdvice} />
          </section>
        </section>
      </section>
    );
};
