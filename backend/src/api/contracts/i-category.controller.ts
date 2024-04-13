import { Request, Response } from "express";

export default interface ICategoryController {
  createCategories(request: Request, response: Response): Promise<void>;
  filterCategories(request: Request, response: Response): Promise<void>;
}
