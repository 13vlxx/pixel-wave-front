import { AdminGameDto, CategoryDto } from "@stores/game/game.model";
import { GetBackofficeUserDto } from "../user/user.model";

export interface GetAdminDataDto {
  users: GetBackofficeUserDto[];
  games: AdminGameDto[];
  categories: CategoryDto[];
}
