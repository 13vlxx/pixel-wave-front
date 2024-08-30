import { PixelWaveAxios } from "@api/Axios";
import { PostDto, PostWithCommentsDto } from "./post.model";

export default {
  getFeed: (currentUserId?: string) =>
    PixelWaveAxios.get<PostDto[]>(
      `/posts${currentUserId ? `?currentUserId=${currentUserId}` : ""}`,
    ).then((res) => res.data),
  getPostById: (postId: string, currentUserId?: string) =>
    PixelWaveAxios.get<PostWithCommentsDto>(
      `/posts/${postId}${currentUserId ? `?currentUserId=${currentUserId}` : ""}`,
    ).then((res) => res.data),
  toggleLike: (postId: string) =>
    PixelWaveAxios.put(`/posts/${postId}`).then((res) => res.data),
  deletePost: (postId: string) =>
    PixelWaveAxios.delete(`/posts/${postId}`).then((res) => res.data),
  deleteComment: (commentId: string) =>
    PixelWaveAxios.delete(`/posts/comment/${commentId}`).then(
      (res) => res.data,
    ),
};
