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
  phoneNumber: number;
  role: "admin";
  password: string;
  address: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
