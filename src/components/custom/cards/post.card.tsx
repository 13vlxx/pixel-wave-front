import dayjs from "@/_utils/dayjs";
import { UserAvatar } from "@/components/custom/_utils/user.avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth/auth.store";
import { PostDto } from "@/stores/post/post.model";
import PostRequest from "@/stores/post/post.request";
import { useUserStore } from "@/stores/user/user.store";
import { useState } from "react";
import { BsChat } from "react-icons/bs";
import { FaHeart, FaTrash } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { PiShareFat } from "react-icons/pi";
import { toast } from "sonner";

interface PostCardProps {
  post: PostDto;
  hideCTA?: boolean;
  onImageClick: (imageUrl: string) => void;
  onDelete?: (postId: string) => void;
  onCommentClick?: (post: PostDto) => void;
}

export const PostCard = (props: PostCardProps) => {
  const { post, hideCTA = false, onImageClick, onDelete, onCommentClick } = props;
  const { token, toggleModal } = useAuthStore();
  const { id } = useUserStore();
  const [isLiked, setIsLiked] = useState(post.isLiked);

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleDeleteClick = () => {
    toast("Êtes-vous sur de vouloir supprimer ce post ?", {
      duration: 5000,
      action: {
        label: "Oui",
        onClick: () => {
          if (onDelete) onDelete(post.id);
        },
      },
    });
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    handleStopPropagation(e);
    if (token) {
      PostRequest.toggleLike(post.id).then(() => {
        setIsLiked(!isLiked);
        post.likes = isLiked ? post.likes - 1 : post.likes + 1;
      });
    } else toggleModal();
  };

  return (
    <Card className="pt-4 mb-4">
      <CardContent className="space-y-2">
        <section className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <UserAvatar user={post.user} />
            <h1 className="max-w-[100%] text-muted-foreground text-[12px] text-ellipsis line-clamp-1">{dayjs(post.createdAt).fromNow()}</h1>
          </div>
          {id == post.user.id && !hideCTA && (
            <FaTrash onClick={handleDeleteClick} className="text-sm text-muted-foreground hover:text-foreground transition-all duration-150" />
          )}
        </section>
        <p className="text-sm">{post.content}</p>
        {post.photo && (
          <AspectRatio onClick={() => onImageClick(post.photo!)} ratio={16 / 9}>
            <img src={post.photo} alt="image" className="h-full w-full rounded-md object-cover border border-secondary cursor-pointer" />
          </AspectRatio>
        )}
        {!hideCTA && (
          <section className="text-muted-foreground text-[12px] flex gap-4 justify-end">
            <div onClick={() => onCommentClick && onCommentClick(post)} className="flex items-center gap-1 cursor-pointer">
              <BsChat />
              <span>{post.comments}</span>
            </div>
            <div onClick={handleToggleLike} className="flex items-center gap-1 cursor-pointer">
              <div className="flex items-center gap-1">{isLiked ? <FaHeart className="text-primary" /> : <LuHeart />}</div>
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <PiShareFat />
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
};
