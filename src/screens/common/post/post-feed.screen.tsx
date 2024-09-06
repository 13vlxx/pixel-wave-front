import PostCard from "@components/cards/post.card";
import { useAuthStore } from "@stores/auth/auth.store";
import { PostDto } from "@stores/post/post.model";
import PostRequest from "@stores/post/post.request";
import { useUserStore } from "@stores/user/user.store";
import { useResponsive } from "@utils/useResponsive";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { CommentModal } from "../../../components/modals/comment.modal";
import { PostModal } from "../../../components/modals/post.modal";

const PostFeedScreen = () => {
  const { token, toggleModal } = useAuthStore();
  const { id } = useUserStore();
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [isNewPostModalShowed, setIsNewPostModalShowed] =
    useState<boolean>(false);
  const [isNewCommentModalShowed, setIsNewCommentModalShowed] =
    useState<PostDto | null>(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    document.title = "Pixel Wave | Feed";
    PostRequest.getFeed(id ? id : "").then(setPosts);
  }, [isNewPostModalShowed, id]);

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
            <PostCard
              onNewComment={(x) =>
                token ? setIsNewCommentModalShowed(x) : toggleModal()
              }
              onDelete={handleDeletePost}
              key={post.id}
              post={post}
            />
          ))}
          <button
            onClick={handleShowNewPostModal}
            className="fixed right-4 bottom-4 btn btn-circle btn-secondary text-xl text-primary bg-secondary"
          >
            <FaPlus />
          </button>
        </section>
      );

    return (
      <section className="flex flex-col gap-2">
        {posts.map((post) => (
          <PostCard
            onNewComment={(x) =>
              token ? setIsNewCommentModalShowed(x) : toggleModal()
            }
            onDelete={handleDeletePost}
            key={post.id}
            post={post}
          />
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
          <PostModal
            handleClose={() => {
              setIsNewPostModalShowed(!isNewPostModalShowed);
            }}
          />
        )}
        {isNewCommentModalShowed && (
          <CommentModal
            post={isNewCommentModalShowed}
            handleClose={() => {
              setIsNewCommentModalShowed(null);
            }}
          />
        )}
      </>
    );

  return (
    <>
      <section className="relative mx-auto p-4 w-[50%]">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl bg-gradient-to-r mb-4 font-semibold">Feed</h1>
          <button
            onClick={handleShowNewPostModal}
            className="btn btn-sm btn-secondary text-primary"
          >
            Poster
          </button>
        </div>
        {main()}
      </section>
      {isNewPostModalShowed && (
        <PostModal
          handleClose={() => {
            setIsNewPostModalShowed(!isNewPostModalShowed);
          }}
        />
      )}
      {isNewCommentModalShowed && (
        <CommentModal
          post={isNewCommentModalShowed}
          handleClose={() => {
            setIsNewCommentModalShowed(null);
          }}
        />
      )}
    </>
  );
};

export default PostFeedScreen;
