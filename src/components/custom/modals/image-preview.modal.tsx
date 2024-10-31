import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AdviceDto } from "@/stores/game/game.model";

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: (advice: AdviceDto | null) => void;
}

export const ImagePreviewModal = (props: ImagePreviewModalProps) => {
  const { isOpen, imageUrl, onClose } = props;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose(null)}>
      <DialogTitle className="hidden">image preview</DialogTitle>
      <DialogContent aria-describedby="image preview" className="w-[98dvw] rounded-md sm:max-w-fit pt-10">
        <img src={imageUrl} alt="image" className="h-full w-full max-h-[80dvh] rounded-md object-contain border-secondary" />
      </DialogContent>
    </Dialog>
  );
};
