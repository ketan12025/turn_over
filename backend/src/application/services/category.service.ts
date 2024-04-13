import { inject, injectable } from "inversify";
import { ContainerTypes } from "../../api/bindings/container-types";
import { ICategoryService } from "../contracts/i-category.service";
import { ICategoryRepository } from "../../infrastructure/repositories/contracts/i-category.repository";
import { ICategoryEntity } from "../../infrastructure/repositories/entities/category.entity";
import { faker } from "@faker-js/faker";

@injectable()
class CategoryService implements ICategoryService {
  @inject(ContainerTypes.CategoryRepository)
  private CategoryRepository!: ICategoryRepository;

  async getCategories(query: any, page: number, pageSize: number) {
    let categories = await this.CategoryRepository.filter(
      query,
      pageSize,
      page
    );
    return {
      categories,
      paginationDetails: {
        totalPage: Math.ceil(
          (await this.CategoryRepository.getCount()) / pageSize
        ),
        currentPage: page,
      },
    };
  }

  async createCategories(categories: Partial<ICategoryEntity>[]) {
    if (!categories?.length) {
      categories = [
        ...new Set(
          Array.from({ length: 100 }, () => {
            return { categoryName: faker.commerce.department() };
          })
        ),
      ];
    }

    let result = (await this.CategoryRepository.createMany(
      categories
    )) as ICategoryEntity[];

    return result;
  }
}

export default CategoryService;
