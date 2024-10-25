import { AspectRatio } from "@/components/ui/aspect-ratio";
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
      <DialogContent aria-describedby="image preview" className="sm:max-w-[80dvw] pt-10">
        <AspectRatio ratio={16 / 9}>
          <img src={imageUrl} alt="image" className="h-full w-full rounded-md object-cover border border-secondary" />
        </AspectRatio>
      </DialogContent>
    </Dialog>
  );
};
