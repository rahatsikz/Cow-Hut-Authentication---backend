export type IPaginationResponse<T> = {
  meta: {
    page: number;
    limit: number;
    count: number;
  };
  data: T;
};
