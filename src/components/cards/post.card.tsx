import { PostDto } from "@stores/post/post.model";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import relativeTime from "dayjs/plugin/relativeTime";
import { BsThreeDots } from "react-icons/bs";
import { FaShare, FaTrash } from "react-icons/fa";
import { toast } from "sonner";

dayjs.extend(relativeTime)
dayjs.locale('fr')

export interface PostCardProps {
    post: PostDto;
}

const PostCard = (props: PostCardProps) => {
    const { post } = props;

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
                            <button onClick={() => toast("Êtes-vous sur de vouloir supprimer ce post ?", {
                                duration: 5000,
                                action: {
                                    label: 'Oui',
                                    onClick: () => {
                                        //TODO: Delete post
                                        console.log(post.id)
                                    },
                                },

                            })} className="btn btn-circle btn-error grid place-items-center">
                                <FaTrash size={16} />
                            </button>
                            <button onClick={() => toast.success("Share")} className="btn btn-circle btn-info grid place-items-center">
                                <FaShare size={16} />
                            </button>
                        </div>
                    </ul>
                </div>
            </div >
            <p className="py-2"> {post.content}</p>
        </div >
    )
}

export default PostCard