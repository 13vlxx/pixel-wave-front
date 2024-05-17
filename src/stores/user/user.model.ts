import { LiteGameDto } from "@stores/game/game.model";

export enum UserRole {
  USER = "USER",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export interface GetUserDto {
  id: string;
  email: string;
  pseudo: string;
  profilePicture: string;
  role: UserRole;
  createdAt: Date;
}

export interface LiteUserDto {
  id: string;
  pseudo: string;
  profilePicture: string;
}

export interface GetUserProfileDto {
  user: GetUserDto;
  favoriteGames: LiteGameDto[];
  posts: [];
}
