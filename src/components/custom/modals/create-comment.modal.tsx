import { PostCard } from "@/components/custom/cards/post.card";
import { CreateCommentForm } from "@/components/custom/forms/create-comment.form";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PostDto } from "@/stores/post/post.model";

interface CreateCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: PostDto;
}

export const CreateCommentModal = (props: CreateCommentModalProps) => {
  const { isOpen, onClose, post } = props;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden">create post</DialogTitle>
      <DialogContent aria-describedby="create post" className="w-[98dvw] sm:max-w-[500px] rounded-md pt-10">
        {post && (
          <section>
            <PostCard post={post} onImageClick={() => {}} hideCTA />
            <CreateCommentForm postId={post.id} onSubmit={onClose} />
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
};
