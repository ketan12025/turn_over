import { inject, injectable } from "inversify";
import { IUserService } from "../contracts/i-user.service";
import { IUserRepository } from "../../infrastructure/repositories/contracts/i-user.repository";
import { ContainerTypes } from "../../api/bindings/container-types";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { appError } from "../../api/models/global-error-handler.model";
import { IUserEntity } from "../../infrastructure/repositories/entities/user.entity";

@injectable()
class UserService implements IUserService {
  @inject(ContainerTypes.UserRepository)
  private UserRepository!: IUserRepository;

  async signUp(user: IUserEntity) {
    if (!user.email || !user.password) {
      throw appError("Email and Password is required", 400);
    }

    let existingUser = (await this.UserRepository.findOne({
      email: user.email,
    })) as IUserEntity;

    if (existingUser)
      throw appError("User with this email already exist.", 400);

    let otp = String(Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000);
    let hashedPassword = await bcrypt.hash(user.password, 12);

    let newUser = (await this.UserRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      otp,
    })) as IUserEntity;
    newUser.password = undefined;
    return newUser;
  }

  async confirmSignUp(user: IUserEntity) {
    if (!user.email || !user.otp) {
      throw appError("please provide one time password", 400);
    }
    let newUser = (await this.UserRepository.findOne({
      email: user.email,
      otp: user.otp,
    })) as IUserEntity;
    if (!newUser) {
      throw appError("Incorrect one time password", 400);
    }
    await this.UserRepository.update(newUser.id, {
      isActive: true,
      otp: null,
    });
    return this.createSendToken(newUser);
  }

  async login(user: IUserEntity) {
    if (!user.email || !user.password) {
      throw appError("please provide email and password", 400);
    }
    const loggedUser = (await this.UserRepository.findOne({
      email: user.email,
    })) as IUserEntity;

    if (
      !user ||
      !(await bcrypt.compare(user.password, loggedUser.password as string))
    ) {
      throw appError("Incorrect email or password", 401);
    }

    return this.createSendToken(loggedUser);
  }

  createSendToken(user: IUserEntity) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    user.password = undefined;
    return { token, user };
  }

  async selectCategories(
    userId: number,
    categoryId: number,
    select: boolean
  ): Promise<IUserEntity> {
    let selectObj = select
      ? { push: categoryId }
      : {
          set: (
            (await this.UserRepository.findOne({
              id: userId,
            })) as IUserEntity
          ).selectedCategories?.filter((id) => id !== categoryId),
        };
    const user = (await this.UserRepository.update(userId, {
      selectedCategories: selectObj,
    })) as IUserEntity;
    return user;
  }
}

export default UserService;
