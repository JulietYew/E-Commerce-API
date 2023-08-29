import { model, Schema } from "mongoose";
import {IOrder} from "../interfaces/order.interface";

const orderSchema = new Schema<IOrder>(
{
     userId: {
        user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    },
    products: [ 
        { 
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        },
        productName: {
            type: String,
            required: true,
        },
        price :{
            type: Number,
            required: true
        }
    }
    ]
})
const Order = model<IOrder>("Order", orderSchema);
export default Order;