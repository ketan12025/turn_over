import { Container } from "inversify";
import { ContainerTypes } from "./container-types";
import UserController from "../controllers/users.controller";
import { IUserService } from "../../application/contracts/i-user.service";
import UserService from "../../application/services/user.service";
import { IUserRepository } from "../../infrastructure/repositories/contracts/i-user.repository";
import { UserRepository } from "../../infrastructure/repositories/impl/user.repository";
import IUserController from "../contracts/i-user.controller";
import { ICategoryService } from "../../application/contracts/i-category.service";
import CategoryService from "../../application/services/category.service";
import { ICategoryRepository } from "../../infrastructure/repositories/contracts/i-category.repository";
import { CategoryRepository } from "../../infrastructure/repositories/impl/category.repository";
import ICategoryController from "../contracts/i-category.controller";
import CategoryController from "../controllers/category.controller";

const container = new Container();

// User binding
container
  .bind<IUserController>(ContainerTypes.UserController)
  .to(UserController);

container.bind<IUserService>(ContainerTypes.UserService).to(UserService);

container
  .bind<IUserRepository>(ContainerTypes.UserRepository)
  .to(UserRepository);

container
  .bind<ICategoryController>(ContainerTypes.CategoryController)
  .to(CategoryController);

// Category binding
container
  .bind<ICategoryService>(ContainerTypes.CategoryService)
  .to(CategoryService);

container
  .bind<ICategoryRepository>(ContainerTypes.CategoryRepository)
  .to(CategoryRepository);

export { container };
