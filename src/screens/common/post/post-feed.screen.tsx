import PostCard from "@components/cards/post.card";
import { useAuthStore } from "@stores/auth/auth.store";
import { PostDto } from "@stores/post/post.model";
import PostRequest from "@stores/post/post.request";
import { useUserStore } from "@stores/user/user.store";
import { useResponsive } from "@utils/useResponsive";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { Modal } from "../../../layouts/modal.layout";

const PostFeedScreen = () => {
  const { token, toggleModal } = useAuthStore();
  const { id } = useUserStore();
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [isNewPostModalShowed, setIsNewPostModalShowed] =
    useState<boolean>(false);
  const { isMobile } = useResponsive();

  useEffect(() => {
    document.title = "Pixel Wave | Feed";
    PostRequest.getFeed(id ? id : "").then(setPosts);
  }, [id]);

  const handleShowNewPostModal = () => {
    if (token) setIsNewPostModalShowed(!isNewPostModalShowed);
    else toggleModal();
  };

  const handleDeletePost = (postId: string) => {
    PostRequest.deletePost(postId).then(() => {
      setPosts(posts.filter((x) => x.id !== postId));
      toast.success("Post supprimé avec succès");
    });
  };

  const main = () => {
    if (isMobile)
      return (
        <section className="flex flex-col gap-2">
          {posts.map((post) => (
            <PostCard onDelete={handleDeletePost} key={post.id} post={post} />
          ))}
          <button
            onClick={handleShowNewPostModal}
            className="fixed right-4 bottom-4 btn btn-circle btn-secondary text-xl text-secondary bg-clip-text"
          >
            <FaPlus />
          </button>
        </section>
      );

    return (
      <section className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostCard onDelete={handleDeletePost} key={post.id} post={post} />
        ))}
      </section>
    );
  };

  if (isMobile)
    return (
      <>
        <section className="relative p-4">
          <h1 className="text-2xl mb-4 font-semibold">Feed</h1>
          {main()}
        </section>
        {isNewPostModalShowed && (
          <Modal
            handleClose={() => {
              setIsNewPostModalShowed(!isNewPostModalShowed);
            }}
          >
            <div className="flex justify-between items-center">alex</div>
          </Modal>
        )}
      </>
    );

  return (
    <>
      <section className="relative p-4 w-[70%]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl bg-gradient-to-r mb-4 font-semibold">Feed</h1>
          <button className="btn btn-sm btn-secondary text-primary">
            Poster
          </button>
        </div>
        {main()}
      </section>
    </>
  );
};

export default PostFeedScreen;
