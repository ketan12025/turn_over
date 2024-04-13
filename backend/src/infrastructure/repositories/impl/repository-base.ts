import { PrismaClient } from "@prisma/client";
import { injectable, unmanaged as _unmanaged } from "inversify";
import { IRepositoryBase } from "../contracts/i-repository-base";

@injectable()
export class RepositoryBase<T> implements IRepositoryBase<T> {
  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(@_unmanaged() modelName: string) {
    this.prisma = new PrismaClient();
    this.modelName = modelName;
  }

  public async findOne<T>(query: any): Promise<T | null> {
    return (this.prisma as any)[this.modelName].findUnique({
      where: query,
    });
  }

  public async create<T>(data: any): Promise<T> {
    return (this.prisma as any)[this.modelName].create({ data });
  }

  public async createMany<T>(data: any[]): Promise<T> {
    return (this.prisma as any)[this.modelName].createMany({
      data,
      skipDuplicates: true,
    });
  }

  public async update<T>(id: number, data: any): Promise<T | null> {
    return (this.prisma as any)[this.modelName].update({
      where: { id },
      data,
    });
  }

  public async delete<T>(id: number): Promise<boolean> {
    const result = await (this.prisma as any)[this.modelName].delete({
      where: { id },
    });
    return Boolean(result);
  }

  public async find<T>(): Promise<T[]> {
    return (this.prisma as any)[this.modelName].findMany();
  }

  async filter(
    query: any,
    pageSize?: number,
    page?: number,
    fields?: any,
    sort?: any
  ): Promise<any> {
    let features = {};

    if (query) {
      features = { ...features, where: query };
    }
    if (sort) {
      features = { ...features, orderBy: sort };
    }
    if (fields) {
      features = { ...features, fields: fields };
    }
    console.log({ page, pageSize });
    if (page && pageSize) {
      features = { ...features, skip: (page - 1) * pageSize, take: pageSize };
    }
    console.log(features);

    return await (this.prisma as any)[this.modelName].findMany(features);
  }
}
