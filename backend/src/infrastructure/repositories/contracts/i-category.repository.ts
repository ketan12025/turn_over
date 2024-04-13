import { ICategoryEntity } from "../entities/category.entity";
import { IRepositoryBase } from "./i-repository-base";

export interface ICategoryRepository extends IRepositoryBase<ICategoryEntity> {
  getCount(): Promise<number>;
}
