import PostCard from "@components/cards/post.card";
import { PostDto } from "@stores/post/post.model";

interface PostsListProps {
    posts: PostDto[]
}

const PostsList = (props: PostsListProps) => {
    const { posts } = props;

    return (
        <div className="flex flex-col gap-2">
            {posts.map((x) => (
                <PostCard key={x.id} post={x} />
            ))}
        </div>
    )
}

export default PostsList