import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import CommentCard from "../../../components/cards/comment.card";
import PostCard from "../../../components/cards/post.card";
import { PostDto, PostWithCommentsDto } from "../../../stores/post/post.model";
import PostRequest from "../../../stores/post/post.request";
import { useUserStore } from "../../../stores/user/user.store";

const PostByIdScreen = () => {
  const { postId } = useParams();
  const { id } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<PostWithCommentsDto | null>(null);
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
  }, [postId, id]);

  const handleDeletePost = (postId: string) => {
    PostRequest.deletePost(postId).then(() => {
      toast.success("Post supprimé avec succès");
      navigate("/posts");
    });
  };

  const handleDeleteComment = (commentId: string) => {
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
  };

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !post) return <div>Post not found</div>;

  return (
    <div className="p-4 pb-0">
      <PostCard post={post as PostDto} onDelete={handleDeletePost} />
      <div className="flex flex-row-reverse">
        <div className="w-[95%]">
          {post!.postComments.map((x) => (
            <div key={x.id}>
              <div className="h-5 bg-white w-px ml-4"></div>
              <CommentCard comment={x} onDelete={handleDeleteComment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostByIdScreen;
