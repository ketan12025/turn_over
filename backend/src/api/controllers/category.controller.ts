import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { successResponse } from "../models/response.model";
import "reflect-metadata";
import { ICategoryService } from "../../application/contracts/i-category.service";
import { ContainerTypes } from "../bindings/container-types";
import ICategoryController from "../contracts/i-category.controller";

@injectable()
class CategoryController implements ICategoryController {
  @inject(ContainerTypes.CategoryService)
  private CategoryService!: ICategoryService;

  async createCategories(request: Request, response: Response) {
    let result = await this.CategoryService.createCategories(request.body);
    response.json(successResponse(result));
  }

  async filterCategories(request: Request, response: Response) {
    let { page, pageSize } = request.query as any;
    let result = await this.CategoryService.getCategories(
      request.body,
      parseInt(page),
      parseInt(pageSize)
    );
    response.json(successResponse(result));
  }
}

export default CategoryController;
