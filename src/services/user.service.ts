import User from '../model/user.model';
import { Model } from 'mongoose';
import { ICreateUser, IUpdateUser, IUser } from '../interfaces/user.interface';

class UserService {
  constructor(public model: Model<IUser>) {
    this.model = model;
  }

  async create(data: ICreateUser) {
    return new this.model(data);
  }

  async updateOne(id: string, data: IUpdateUser) {
    return await this.model.findByIdAndUpdate({ _id: id }, data, { new: true });
  }

  async deleteOne(id: string) {
    return await this.model.findByIdAndDelete({ _id: id });
  }

  async find(filter: Partial<IUser>) {
    return await this.model.findOne(filter);
  }

  async findAll(filter: Partial<IUser>) {
    return await this.model.find(filter);
  }
}

const userService = new UserService(User);
export default userService;