import { PixelWaveAxios } from "@api/Axios";
import { PostDto } from "./post.model";

export default {
  getFeed: (currentUserId?: string) =>
    PixelWaveAxios.get<PostDto[]>(
      `/posts${currentUserId ? `?currentUserId=${currentUserId}` : ""}`
    ).then((res) => res.data),
  toggleLike: (postId: string) => PixelWaveAxios.put(`/posts/${postId}`).then((res) => res.data),
};
