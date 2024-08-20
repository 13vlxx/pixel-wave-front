import { LiteUserDto } from "@stores/user/user.model";

export interface PostDto {
  id: string;
  content: string;
  photo?: string | null;
  createdAt: string;
  user: LiteUserDto;
  likes: number;
  comments: number;
  isLiked: boolean;
}
