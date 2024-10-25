import { Button } from "@/components/ui/button";
import { PostDto } from "@/stores/post/post.model";
import { FaPlus } from "react-icons/fa";
import { PostCard } from "../cards/post.card";

interface PostFeedProps {
  title: string;
  posts: PostDto[];
  onCreatePost?: () => void;
  onDeletePost?: (postId: string) => void;
}

export const PostFeed = (props: PostFeedProps) => {
  const { title, posts, onCreatePost, onDeletePost } = props;

  return (
    <section className="px-4">
      {posts.length > 0 && <h1 className="text-lg font-semibold pb-2">{title}</h1>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDeletePost} />
      ))}
      {onCreatePost && (
        <Button onClick={onCreatePost} className="fixed bottom-2 right-4 mb-2 rounded-full bg-primary/70 backdrop-blur-md" size={"icon"}>
          <FaPlus />
        </Button>
      )}
    </section>
  );
};
