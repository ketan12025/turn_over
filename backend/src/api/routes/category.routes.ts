import express, { NextFunction, Request, Response } from "express";
import { container } from "../bindings/container-bindings";
import { ContainerTypes } from "../bindings/container-types";
import "reflect-metadata";
import ICategoryController from "../contracts/i-category.controller";

export default function CategoryRoute() {
  const router = express.Router();
  const CategoryController = container.get<ICategoryController>(
    ContainerTypes.CategoryController
  );

  router.post(
    "/bulk",
    (request: Request, response: Response, next: NextFunction) => {
      CategoryController.createCategories(request, response).catch(next);
    }
  );

  router.post(
    "/filter",
    (request: Request, response: Response, next: NextFunction) => {
      CategoryController.filterCategories(request, response).catch(next);
    }
  );

  return router;
}
