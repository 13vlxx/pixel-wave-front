import { PixelWaveAxios } from "@api/Axios";

export default {
  toggleLike: (postId: string) => PixelWaveAxios.put(`/posts/${postId}`).then((res) => res.data),
};
