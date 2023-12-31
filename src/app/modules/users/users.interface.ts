import { Model } from 'mongoose';

export type TOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: TOrder[];
};

export type TUserMethod = {
  isUserExists(userId: number): Promise<TUser | null>;
  totalOderPirce(userId: number): Promise<number>;
};

export type TUserModel = Model<TUser, Record<number, never>, TUserMethod>;
