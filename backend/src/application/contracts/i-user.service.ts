import { IUserEntity } from "../../infrastructure/repositories/entities/user.entity";

export interface IUserService {
  signUp(user: any): Promise<IUserEntity>;
  confirmSignUp(
    user: IUserEntity
  ): Promise<{ token: string; user: IUserEntity }>;
  login(user: IUserEntity): Promise<{ token: string; user: IUserEntity }>;
  selectCategories(
    userId: number,
    categoryId: number,
    select: boolean
  ): Promise<IUserEntity>;
}
