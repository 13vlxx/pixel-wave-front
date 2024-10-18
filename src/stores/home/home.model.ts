import { AdviceDto, CategoryDto, LiteGameDto, PlatformDto } from "@/stores/game/game.model";

export interface HomepageDto {
  games: LiteGameDto[];
  advices: AdviceDto[];
  categories: CategoryDto[];
  platforms: PlatformDto[];
}
