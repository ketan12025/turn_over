
import { IUserEntity } from "../entities/user.entity";
import { IRepositoryBase } from "./i-repository-base";

export interface IUserRepository extends IRepositoryBase<IUserEntity> {
  getCount():Promise<number>
}
