import { ICategoryEntity } from "../../infrastructure/repositories/entities/category.entity";

export interface ICategoryService {
  createCategories(categories: ICategoryEntity[]): Promise<ICategoryEntity[]>;
  getCategories(query: any, page: number, pageSize: number): Promise<any>;
}
