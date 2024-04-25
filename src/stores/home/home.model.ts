import { LiteUserDto } from "@stores/user/user.model";

export interface HomepageDto {
  games: LiteGameDto[];
  advices: AdviceDto[];
  categories: CategoryDto[];
  platforms: PlatformDto[];
}

export interface GameDto {
  id: string;
  name: string;
  logo: string;
  description: string;
  releaseDate: string;
  game_category: CategoryDto[];
  game_platform: PlatformDto[];
}

export interface LiteGameDto {
  id: string;
  name: string;
  logo: string;
}

export interface CategoryDto {
  id: string;
  name: string;
  image: string;
}

export interface PlatformDto {
  id: string;
  name: string;
  image: string;
}

export interface AdviceDto {
  user: LiteUserDto;
  game: LiteGameDto;
  advice: string;
  note: number;
}
