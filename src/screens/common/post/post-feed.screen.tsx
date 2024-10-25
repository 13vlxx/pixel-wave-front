import { useResponsive } from "@/_utils/use-responsive";
import { PostFeed } from "@/components/custom/_utils/post.feed";
import { CreatePostModal } from "@/components/custom/modals/create-post.modal";
import { useAuthStore } from "@/stores/auth/auth.store";
import { PostDto } from "@/stores/post/post.model";
import PostRequest from "@/stores/post/post.request";
import { useUserStore } from "@/stores/user/user.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const PostFeedScreen = () => {
  const { token, toggleModal } = useAuthStore();
  const { id } = useUserStore();
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [showPostCreationModal, setShowPostCreationModal] = useState<boolean>(false);
  const [isNewCommentModalShowed, setIsNewCommentModalShowed] = useState<PostDto | null>(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    document.title = "Pixel Wave | Feed";
    PostRequest.getFeed(id ? id : "").then(setPosts);
  }, [showPostCreationModal, id]);

  const handleShowPostCreationModal = () => {
    if (token) setShowPostCreationModal(!showPostCreationModal);
    else toggleModal();
  };

  const handleDeletePost = (postId: string) => {
    PostRequest.deletePost(postId).then(() => {
      setPosts(posts.filter((x) => x.id !== postId));
      toast.success("Post supprimé avec succès");
    });
  };

  return (
    <>
      <section className="py-4 sm:px-[20dvw]">
        <PostFeed posts={posts} title="Feed" onDeletePost={handleDeletePost} onCreatePost={handleShowPostCreationModal} />
      </section>
      <CreatePostModal isOpen={showPostCreationModal} onClose={handleShowPostCreationModal} />
    </>
  );
};
