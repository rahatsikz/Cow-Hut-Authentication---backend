import { IPaginationOptions } from "../interface/IPaginationOptions";

const calculatePagination = (option: IPaginationOptions) => {
  const page = Number(option.page || 1);
  const limit = Number(option.limit || 10);

  const skip = (page - 1) * limit;

  const sortBy = option.sortBy || "createdAt";
  const sortOrder = option.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const PaginationHelpers = {
  calculatePagination,
};
