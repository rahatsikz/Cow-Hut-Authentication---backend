import { SortOrder } from "mongoose";

export type IPaginationOptions = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
};
