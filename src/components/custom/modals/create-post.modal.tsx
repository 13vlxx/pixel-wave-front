import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CreatePostForm } from "../forms/create-post.form";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal = (props: CreatePostModalProps) => {
  const { isOpen, onClose } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">create post</DialogTitle>
      <DialogContent aria-describedby="create post" className="w-[98dvw] sm:max-w-[500px] rounded-md">
        <CreatePostForm onSubmit={onClose} />
      </DialogContent>
    </Dialog>
  );
};
