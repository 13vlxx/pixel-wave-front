import { useResponsive } from "@/_utils/use-responsive";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { AdviceDto, GameDto } from "@/stores/game/game.model";
import { CreateUpdateAdviceForm } from "../forms/create-update-advice.form";

interface AdviceModalProps {
  isOpen: boolean;
  game: GameDto;
  advice: AdviceDto | null;
  onClose: (advice: AdviceDto | null) => void;
}

export const AdviceModal = (props: AdviceModalProps) => {
  const { isMobile } = useResponsive();
  const { isOpen, game, advice, onClose } = props;

  if (isMobile)
    return (
      <Drawer open={isOpen} onOpenChange={() => onClose(null)}>
        <DialogTitle className="hidden">Auth</DialogTitle>
        <DrawerContent aria-description="auth form" className="p-4">
          <CreateUpdateAdviceForm advice={advice} game={game} closeModal={(x) => onClose(x)} />
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose(null)}>
      <DialogTitle className="hidden">Auth</DialogTitle>
      <DialogContent aria-describedby="auth form" className="sm:max-w-[425px]">
        <CreateUpdateAdviceForm advice={advice} game={game} closeModal={onClose} />
      </DialogContent>
    </Dialog>
  );
};
