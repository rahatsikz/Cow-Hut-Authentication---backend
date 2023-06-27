/* 
_id
phoneNumber
role → enum → ['admin']
password
name
firstName
lastName
address
createdAt
updatedAt
*/

import { Model } from "mongoose";

type Name = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  name: Name;
  phoneNumber: string;
  role: "admin";
  password: string;
  address: string;
};

export type ILoginAdmin = {
  phoneNumber: string;
  password: string;
};

export interface IAdminMethods {
  isAdminExists(phoneNumber: string): Promise<Partial<IAdmin | null>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>;
