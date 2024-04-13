import { Request, Response } from "express";

export default interface IUserController {
  signUp(request: Request, response: Response): Promise<void>;
  confirmSignUp(request: Request, response: Response): Promise<void>;
  login(request: Request, response: Response): Promise<void>;
  selectCategory(request: Request, response: Response): Promise<void>;
}
