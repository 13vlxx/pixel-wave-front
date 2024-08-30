import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "../../../components/cards/comment.card";
import PostCard from "../../../components/cards/post.card";
import { PostDto, PostWithCommentsDto } from "../../../stores/post/post.model";
import PostRequest from "../../../stores/post/post.request";

const PostByIdScreen = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<PostWithCommentsDto | null>(null);

  useEffect(() => {
    PostRequest.getPostById(id ?? "")
      .then((x) => {
        setPost(x);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !post) return <div>Post not found</div>;

  return (
    <div className="p-4 pb-0">
      <PostCard post={post as PostDto} onDelete={() => console.log("a")} />
      <div className="flex flex-row-reverse">
        <div className="w-[95%]">
          {post!.postComments.map((x) => (
            <>
              <div className="h-5 bg-white w-px ml-4"></div>
              <CommentCard
                key={x.id}
                comment={x}
                onDelete={() => console.log("a")}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostByIdScreen;
