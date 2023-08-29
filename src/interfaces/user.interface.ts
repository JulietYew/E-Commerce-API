import { Schema } from "mongoose";

export interface IUser{
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  order: Schema.Types.ObjectId;
  address?: string;
  role: string;
  verified: boolean;
  deleted: boolean;
}

export interface ICreateUser {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  address?: string;
}

export interface IUpdateUser {
  fullname?: string;
  email?: string;
  password?: string;
  order?: string;
  address?: string;
  verified?: boolean;
  deleted?: boolean;
}