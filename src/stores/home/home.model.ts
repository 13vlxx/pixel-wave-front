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
}

export interface PlatformDto {
  id: string;
  name: string;
}
