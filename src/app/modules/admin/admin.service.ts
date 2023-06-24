import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  const createdAdmin = await Admin.create(payload);
  return createdAdmin;
};

export const AdminService = {
  createAdmin,
};
