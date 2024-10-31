export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    numberOfItems: number;
    page: number;
    totalPages: number;
    limit: number;
  };
}

export class PaginationOptionsDto {
  page?: number = 1;
  limit?: number = 2;
}
