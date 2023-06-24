/* 
_id
phoneNumber
role → enums → [‘seller’,’ buyer’]
password
name
firstName
lastName
address
budget → Savings for buying the cow
income → money from selling the cow
createdAt
updatedAt */

import { Model } from "mongoose";

type Name = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  name: Name;
  password: string;
  phoneNumber: string;
  role: "seller" | "buyer";
  address: string;
  budget: number;
  income: number;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
