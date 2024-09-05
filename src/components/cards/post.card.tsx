import { useAuthStore } from "@stores/auth/auth.store";
import { PostDto } from "@stores/post/post.model";
import PostRequest from "@stores/post/post.request";
import { useUserStore } from "@stores/user/user.store";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaRegComment, FaShare, FaTrash } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

dayjs.extend(relativeTime);
dayjs.locale("fr");

export interface PostCardProps {
  post: PostDto;
  hideActions?: boolean;
  onNewComment: (post: PostDto) => void;
  onDelete: (postId: string) => void;
}

const PostCard = ({
  post,
  hideActions = false,
  onNewComment,
  onDelete,
}: PostCardProps) => {
  const { token } = useAuthStore();
  const { toggleModal } = useAuthStore();
  const { id } = useUserStore();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(post.isLiked);

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePostClick = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleShare = async () => {
    navigator.clipboard
      .writeText("http://localhost:5173/posts/" + post.id)
      .then(() => {
        toast.success("Lien copié avec succès");
      });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    handleStopPropagation(e);
    if (token) {
      PostRequest.toggleLike(post.id).then(() => {
        setIsFavorite(!isFavorite);
        post.likes = isFavorite ? post.likes - 1 : post.likes + 1;
      });
    } else toggleModal();
  };

  const heart = () => {
    if (token)
      return (
        <div onClick={handleToggleFavorite}>
          <div className="flex items-center gap-1 cursor-pointer">
            <p className="text-sm">{post.likes}</p>
            {isFavorite ? <FaHeart color="red" /> : <LuHeart />}
          </div>
        </div>
      );

    return (
      <div onClick={handleToggleFavorite}>
        <div className="flex items-center gap-1 cursor-pointer">
          <p className="text-sm">{post.likes}</p>
          <LuHeart />
        </div>
      </div>
    );
  };

  const actionButtons = (
    <div className="flex gap-2 justify-end items-center">
      <div
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          onNewComment(post);
        }}
        className="flex items-center gap-1"
      >
        <p className="text-sm">{post.comments}</p>
        {<FaRegComment />}
      </div>
      {heart()}
    </div>
  );

  return (
    <div
      onClick={handlePostClick}
      className="p-4 rounded-md border border-secondary cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <Link
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          to={post.user.id === id ? "/profile/me" : `/profile/${post.user.id}`}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={post.user.profilePicture || "/default-pfp.jpeg"}
            alt={`Photo de profil de ${post.user.pseudo}`}
            className="object-cover size-[40px] rounded-full"
          />
          <h1 className="max-w-[100%] text-sm text-ellipsis line-clamp-1">{`@${post.user.pseudo} • ${dayjs(post.createdAt).fromNow()}`}</h1>
        </Link>
        {!hideActions && (
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="dropdown  dropdown-end"
          >
            <div tabIndex={0} role="button">
              <BsThreeDots className="size-6" />
            </div>
            <ul className="menu bg-neutral dropdown-content rounded-box shadow">
              <label htmlFor=""></label>
              <div className="flex gap-2">
                {id === post.user.id && (
                  <button
                    onClick={() =>
                      toast("Êtes-vous sur de vouloir supprimer ce post ?", {
                        duration: 5000,
                        action: {
                          label: "Oui",
                          onClick: () => {
                            onDelete(post.id);
                          },
                        },
                      })
                    }
                    className="bg-error size-8 rounded-full p-0 grid place-items-center"
                  >
                    <FaTrash size={16} />
                  </button>
                )}
                <button
                  onClick={handleShare}
                  className="bg-info size-8 rounded-full p-0 grid place-items-center"
                >
                  <FaShare size={16} />
                </button>
              </div>
            </ul>
          </div>
        )}
      </div>
      <p className="py-2"> {post.content}</p>
      {!hideActions && actionButtons}
    </div>
  );
};

export default PostCard;
