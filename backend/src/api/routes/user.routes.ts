import express, { NextFunction, Request, Response } from "express";
import { container } from "../bindings/container-bindings";
import { ContainerTypes } from "../bindings/container-types";
import "reflect-metadata";
import IUserController from "../contracts/i-user.controller";
import authTokenValidation from "../middleware/auth.middleware";

export default function UserRoute() {
  const router = express.Router();
  const UserController = container.get<IUserController>(
    ContainerTypes.UserController
  );

  router.post(
    "/signUp",
    (request: Request, response: Response, next: NextFunction) => {
      UserController.signUp(request, response).catch(next);
    }
  );

  router.post(
    "/confirm/signUp",
    (request: Request, response: Response, next: NextFunction) => {
      UserController.confirmSignUp(request, response).catch(next);
    }
  );

  router.post(
    "/login",
    (request: Request, response: Response, next: NextFunction) => {
      UserController.login(request, response).catch(next);
    }
  );

  router.post(
    "/:id/category",
    authTokenValidation,
    (request: Request, response: Response, next: NextFunction) => {
      UserController.selectCategory(request, response).catch(next);
    }
  );

  return router;
}
