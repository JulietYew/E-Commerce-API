import { Schema } from "mongoose";

export interface IOrder{
    userId: Schema.Types.ObjectId;
    products:{
        productId: Schema.Types.ObjectId;
        productName: string;
        price: number;

    }
}

export interface ICreateOrder {
    userId: string
    products:{
        productId: string;
        productName: string;
        price: number;

    }
}

export interface IUpdateOrder{
    products:{
        productId: string;
        productName: string;
        price: number;

    }
}
