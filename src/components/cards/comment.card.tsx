import { useAuthStore } from "@stores/auth/auth.store";
import { useUserStore } from "@stores/user/user.store";
import dayjs from "@utils/dayjs";
import { BsThreeDots } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CommentDto } from "../../stores/post/post.model";

export interface CommentCardProps {
  comment: CommentDto;
  onDelete: (commentId: string) => void;
}

const CommentCard = (props: CommentCardProps) => {
  const { comment, onDelete } = props;
  const { token } = useAuthStore();
  const { id } = useUserStore();

  return (
    <div className="p-4 rounded-md border border-secondary">
      <div className="flex items-center justify-between">
        <Link to={token ? (comment.user.id === id ? "/profile/me" : `/profile/${comment.user.id}`) : ""} className="flex items-center gap-2 cursor-pointer">
          <img
            src={comment.user.profilePicture || "/default-pfp.jpeg"}
            alt={`Photo de profil de ${comment.user.pseudo}`}
            className="object-cover size-[40px] rounded-full"
          />
          <h1 className="max-w-[100%] text-sm text-ellipsis line-clamp-1">{`@${comment.user.pseudo} • ${dayjs(comment.createdAt).fromNow()}`}</h1>
        </Link>
        {id === comment.user.id && (
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()} className="dropdown  dropdown-end">
            <div tabIndex={0} role="button">
              <BsThreeDots className="size-6" />
            </div>
            <ul className="menu bg-neutral dropdown-content rounded-box shadow">
              <label htmlFor=""></label>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    toast("Êtes-vous sur de vouloir supprimer ce comment ?", {
                      duration: 5000,
                      action: {
                        label: "Oui",
                        onClick: () => {
                          onDelete(comment.id);
                        },
                      },
                    })
                  }
                  className="bg-error size-8 rounded-full p-0 grid place-items-center"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </ul>
          </div>
        )}
      </div>
      <p className="py-2"> {comment.content}</p>
    </div>
  );
};

export default CommentCard;
