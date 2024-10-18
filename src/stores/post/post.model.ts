import { LiteUserDto } from "@/stores/user/user.model";

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

export interface CreatePostDto {
  content: string;
  photo?: FileList | null;
}

export interface CreateCommentDto {
  content: string;
}

export interface CommentDto {
  id: string;
  content: string;
  user: LiteUserDto;
  createdAt: Date;
}

export interface PostWithCommentsDto extends PostDto {
  postComments: CommentDto[];
}
