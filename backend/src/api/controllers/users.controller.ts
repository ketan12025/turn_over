import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { successResponse } from "../models/response.model";
import "reflect-metadata";
import IUserController from "../contracts/i-user.controller";
import { IUserService } from "../../application/contracts/i-user.service";
import { ContainerTypes } from "../bindings/container-types";

@injectable()
class UserController implements IUserController {
  @inject(ContainerTypes.UserService)
  private UserService!: IUserService;

  async signUp(request: Request, response: Response) {
    let result = await this.UserService.signUp(request.body);
    response.json(successResponse(result));
  }

  async confirmSignUp(request: Request, response: Response) {
    let result = await this.UserService.confirmSignUp(request.body);
    response.json(successResponse(result));
  }

  async login(request: Request, response: Response) {
    let result = await this.UserService.login(request.body);
    response.json(successResponse(result));
  }

  async selectCategory(request: Request, response: Response) {
    let { id } = request.params;
    let result = await this.UserService.selectCategories(
      parseInt(id),
      request.body.categoryId,
      request.body?.isSelected || false
    );
    response.json(successResponse(result));
  }
}

export default UserController;
