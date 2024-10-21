import { LiteGameDto } from "@/stores/game/game.model";
import { PostDto } from "@/stores/post/post.model";

export enum UserRole {
  USER = "USER",
  CERTIFIED = "CERTIFIED",
  MODERATOR = "MODERATOR",
  ADMIN = "ADMIN",
}

export enum NotificationTypeEnum {
  NEW_LIKE = "NEW_LIKE",
  NEW_COMMENT = "NEW_COMMENT",
}

export interface GetUserDto {
  id: string;
  email: string;
  pseudo: string;
  profilePicture: string;
  role: UserRole;
  createdAt: Date;
}

export interface StaffRequestUserDto {
  id: string;
  pseudo: string;
  email: string;
  profilePicture: string;
}

export interface GetBackofficeUserDto {
  id: string;
  email: string;
  pseudo: string;
  role: UserRole;
}

export interface LiteUserDto {
  id: string;
  pseudo: string;
  profilePicture: string;
  role: UserRole;
}

export interface GetMeDto {
  user: GetUserDto;
  receiveEmails: boolean;
  favoriteGames: LiteGameDto[];
  posts: PostDto[];
}

export interface GetRoleDto {
  role: UserRole;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GetUserProfileDto extends Omit<GetMeDto, "receiveEmails"> {}

export interface UpdateSettingsDto {
  password?: string | null;
  receiveEmails: boolean;
}

export interface UpdateReceiveNotificationsDto {
  receiveNotifications: boolean;
}

export interface GetNotificationsDto {
  id: string;
  user: LiteUserDto;
  notificationType: NotificationTypeEnum;
  destinationId: string;
  isRead: boolean;
  createdAt: Date;
}
