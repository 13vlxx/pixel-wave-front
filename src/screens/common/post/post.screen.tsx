import { CommentCard } from "@/components/custom/cards/comment.card";
import { PostCard } from "@/components/custom/cards/post.card";
import { CreateCommentModal } from "@/components/custom/modals/create-comment.modal";
import { ImagePreviewModal } from "@/components/custom/modals/image-preview.modal";
import { useAuthStore } from "@/stores/auth/auth.store";
import { PostDto, PostWithCommentsDto } from "@/stores/post/post.model";
import PostRequest from "@/stores/post/post.request";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export const PostScreen = () => {
  const { token, toggleModal } = useAuthStore();
  const { postId } = useParams();
  const { id } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isNewCommentModalShowed, setIsNewCommentModalShowed] = useState<PostDto | undefined>(undefined);
  const [post, setPost] = useState<PostWithCommentsDto | null>(null);
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    PostRequest.getPostById(postId ?? "", id ? id : "")
      .then((x) => {
        setPost(x);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [postId, id, isNewCommentModalShowed]);

  const handleDeletePost = (postId: string) => {
    PostRequest.deletePost(postId).then(() => {
      navigate("/");
      toast.success("Post supprimé avec succès");
    });
  };

  const handleDeleteComment = (commentId: string) => {
    toast("Êtes-vous sur de vouloir supprimer ce commentaire ?", {
      duration: 5000,
      action: {
        label: "Oui",
        onClick: () => {
          PostRequest.deleteComment(commentId)
            .then(() => {
              setPost({
                ...post!,
                postComments: post!.postComments.filter((x) => x.id !== commentId),
              });
              toast.success("Commentaire supprimé avec succès");
            })
            .catch(() => {
              console.log("error");
            });
        },
      },
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  if (post)
    return (
      <>
        <section className="p-4 sm:px-[20dvw]">
          <PostCard
            post={post}
            removeMarginBottom
            onImageClick={(x) => setShowImagePreview(x)}
            onCommentClick={(post) => {
              if (token) {
                setIsNewCommentModalShowed(post);
              } else {
                toggleModal();
              }
            }}
            onDelete={handleDeletePost}
          />
          {post.postComments.map((x) => (
            <div className="w-[95%] ml-auto">
              <div className="w-px h-8 bg-black/20 dark:bg-secondary ml-auto mr-20"></div>
              <CommentCard comment={x} onDelete={handleDeleteComment} />
            </div>
          ))}
        </section>
        <ImagePreviewModal isOpen={!!showImagePreview} imageUrl={showImagePreview ?? ""} onClose={() => setShowImagePreview(null)} />
        <CreateCommentModal isOpen={!!isNewCommentModalShowed} onClose={() => setIsNewCommentModalShowed(undefined)} post={isNewCommentModalShowed} />
      </>
    );
};
