import { injectable } from "inversify";
import { RepositoryBase } from "./repository-base";
import { IUserRepository } from "../contracts/i-user.repository";
import { IUserEntity } from "../entities/user.entity";

@injectable()
export class UserRepository
  extends RepositoryBase<IUserEntity>
  implements IUserRepository
{
  constructor() {
    super("User");
  }

  async getCount() {
    return await this.prisma.user.count();
  }
}
