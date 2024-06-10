import { PostDto } from "@stores/post/post.model";

export interface PostCardProps {
    post: PostDto;
}

const PostCard = (props: PostCardProps) => {
    const { post } = props;

    return (
        <div className="p-2 rounded-md border border-secondary">
            <h1 > {post.content}</h1>
        </div >
    )
}

export default PostCard