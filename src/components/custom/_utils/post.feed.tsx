import { PostDto } from "@/stores/post/post.model";
import { PostCard } from "../cards/post.card";

interface PostFeedProps {
  title: string;
  posts: PostDto[];
  onCreatePost?: (post: PostDto) => void;
  onDeletePost?: (postId: string) => void;
}

export const PostFeed = (props: PostFeedProps) => {
  const { title, posts, onDeletePost } = props;

  return (
    <section className="px-4">
      {posts.length > 0 && <h1 className="text-lg font-semibold pb-2">{title}</h1>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDeletePost} />
      ))}
    </section>
  );
};
