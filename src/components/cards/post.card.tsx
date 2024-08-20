import { useAuthStore } from "@stores/auth/auth.store";
import { PostDto } from "@stores/post/post.model";
import PostRequest from "@stores/post/post.request";
import { useUserStore } from "@stores/user/user.store";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaHeart, FaRegComment, FaShare, FaTrash } from "react-icons/fa";
import { LuHeart } from "react-icons/lu";
import { toast } from "sonner";

dayjs.extend(relativeTime)
dayjs.locale('fr')

export interface PostCardProps {
    post: PostDto;
}

const PostCard = (props: PostCardProps) => {
    const { token } = useAuthStore();
    const { id } = useUserStore();
    const { post } = props;

    const [isFavorite, setIsFavorite] = useState(post.isLiked);

    const handleToggleFavorite = () => {
        if (token) {
            PostRequest.toggleLike(post.id).then(() => {
                setIsFavorite(!isFavorite)
                post.likes = isFavorite ? post.likes - 1 : post.likes + 1
            })
        }
        else toast.error("Vous devez être connecté pour aimer un post")
    };

    const heart = (
        <div onClick={handleToggleFavorite}>
            <div className="flex items-center gap-1">
                <p className="text-sm">{post.likes}</p>
                {isFavorite ? <FaHeart color="red" /> : <LuHeart />}
            </div>
        </div>
    )

    const actionButtons = (
        <div className="flex gap-2 w-full justify-end items-center">
            <div className="flex items-center gap-1">
                <p className="text-sm">{post.comments}</p>
                {<FaRegComment />}
            </div>
            {token && heart || <LuHeart />}
        </div>
    )

    return (
        <div className="p-4 rounded-md border border-secondary">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src={post.user.profilePicture} alt={`Photo de profil de ${post.user.pseudo}`} className="object-cover size-[50px] rounded-full" />
                    <h1 className="max-w-[100%] text-ellipsis line-clamp-1">{`@${post.user.pseudo} • ${dayjs(post.createdAt).fromNow()}`}</h1>
                </div>
                <div className="dropdown  dropdown-end">
                    <div tabIndex={0} role="button">
                        <BsThreeDots className="size-6" />
                    </div>
                    <ul className="menu bg-neutral dropdown-content rounded-box shadow">
                        <label htmlFor=""></label>
                        <div className="flex gap-2">
                            {id === post.user.id &&
                                <button onClick={() => toast("Êtes-vous sur de vouloir supprimer ce post ?", {
                                    duration: 5000,
                                    action: {
                                        label: 'Oui',
                                        onClick: () => {
                                            //TODO: Delete post
                                            console.log(post.id)
                                        },
                                    },

                                })} className="bg-error size-8 rounded-full p-0 grid place-items-center">
                                    <FaTrash size={16} />
                                </button>}
                            <button onClick={() => toast.success("Share")} className="bg-info size-8 rounded-full p-0 grid place-items-center">
                                <FaShare size={16} />
                            </button>
                        </div>
                    </ul>
                </div>
            </div >
            <p className="py-2"> {post.content}</p>
            {actionButtons}
        </div >
    )
}

export default PostCard