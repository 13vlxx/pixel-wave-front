import { PostCard } from "@/components/custom/cards/post.card";
import { ImagePreviewModal } from "@/components/custom/modals/image-preview.modal";
import { Button } from "@/components/ui/button";
import { PostDto } from "@/stores/post/post.model";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface PostFeedProps {
  title: string;
  posts: PostDto[];
  onCommentPost: (post: PostDto) => void;
  onCreatePost?: () => void;
  onDeletePost?: (postId: string) => void;
}

export const PostFeed = (props: PostFeedProps) => {
  const { title, posts, onCommentPost, onCreatePost, onDeletePost } = props;
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <>
      <section className="px-4">
        {posts.length > 0 && <h1 className="text-lg font-semibold pb-2">{title}</h1>}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={onDeletePost}
            onImageClick={(x) => setShowImagePreview(x)}
            onCommentClick={(x) => onCommentPost(x)}
            onPostClick={navigate}
          />
        ))}
        {onCreatePost && (
          <Button onClick={onCreatePost} className="fixed bottom-2 right-4 mb-2 rounded-full bg-primary/70 backdrop-blur-md" size={"icon"}>
            <FaPlus />
          </Button>
        )}
      </section>
      <ImagePreviewModal isOpen={!!showImagePreview} imageUrl={showImagePreview ?? ""} onClose={() => setShowImagePreview(null)} />
    </>
  );
};
