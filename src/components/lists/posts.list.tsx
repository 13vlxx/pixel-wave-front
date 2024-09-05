import PostCard from "@components/cards/post.card";
import { PostDto } from "@stores/post/post.model";
import { toast } from "sonner";
import PostRequest from "../../stores/post/post.request";

interface PostsListProps {
  posts: PostDto[];
  onDelete: (postId: string) => void;
}

const PostsList = (props: PostsListProps) => {
  const { posts, onDelete } = props;

  const handleDeletePost = (postId: string) => {
    PostRequest.deletePost(postId).then(() => {
      onDelete(postId);
      toast.success("Post supprimé avec succès");
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {posts.map((x) => (
        <PostCard key={x.id} post={x} onDelete={handleDeletePost} />
      ))}
    </div>
  );
};

export default PostsList;
