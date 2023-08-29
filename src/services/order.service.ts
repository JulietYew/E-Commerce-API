import Order from '../model/order.model';
import { Model } from 'mongoose';
import { ICreateOrder, IUpdateOrder, IOrder } from '../interfaces/order.interface';

class OrderService {
  constructor(public model: Model<IOrder>) {
    this.model = model;
  }

  async create(data: ICreateOrder) {
    return new this.model(data);
  }

  async updateOne(id: string, data: IUpdateOrder) {
    return await this.model.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteOne(id: string) {
    return await this.model.findByIdAndDelete({ _id: id });
  }

  async findOne(filter: Partial<IOrder>) {
    return await this.model.findOne(filter);
  }

  async findAll(filter: Partial<IOrder>) {
    return await this.model.find(filter);
  }
}

const orderService = new OrderService(Order);
export default orderService;