import { LiteNewsDto } from "@/stores/news/news.model";
import { LiteUserDto } from "@/stores/user/user.model";

export interface GameDto {
  id: string;
  name: string;
  logo: string;
  description: string;
  releaseDate: string;
  media: MediaDto[];
  game_category: [{ category: CategoryDto }];
  game_platform: [{ platform: PlatformDto }];
  game_advice: AdviceDto[];
  news: LiteNewsDto[];
}

export interface AdminGameDto {
  id: string;
  name: string;
  logo: string;
  media: string[];
  description: string;
  releaseDate: string;
  categories: string[];
  platforms: string[];
}

export interface MediaDto {
  id: string;
  type: string;
  path: string;
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

export interface LiteGameDto {
  id: string;
  name: string;
  logo: string;
}

export interface CreateAdviceDto {
  advice: string;
  note: number;
}
