import { LiteGameDto } from "@stores/game/game.model";
import { PostDto } from "@stores/post/post.model";

export enum UserRole {
  USER = "USER",
  CERTIFIED = "CERTIFIED",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export interface GetUserDto {
  id: string;
  email: string;
  pseudo: string;
  profilePicture?: string | null;
  role: UserRole;
  createdAt: Date;
}

export interface LiteUserDto {
  id: string;
  pseudo: string;
  profilePicture: string;
}

export interface GetMeDto {
  user: GetUserDto;
  recieveEmails: boolean;
  favoriteGames: LiteGameDto[];
  posts: PostDto[];
}

export interface UpdateSettingsDto {
  password?: string | null;
  recieveEmails: boolean;
}
