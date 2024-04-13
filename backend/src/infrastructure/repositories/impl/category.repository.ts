import { injectable } from "inversify";
import { RepositoryBase } from "./repository-base";
import { ICategoryRepository } from "../contracts/i-category.repository";
import { ICategoryEntity } from "../entities/category.entity";

@injectable()
export class CategoryRepository
  extends RepositoryBase<ICategoryEntity>
  implements ICategoryRepository
{
  constructor() {
    super("Category");
  }

  async getCount() {
    return await this.prisma.category.count();
  }
}
