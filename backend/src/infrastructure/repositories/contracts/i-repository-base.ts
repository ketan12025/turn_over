export interface IRepositoryBase<T> {
  findOne<T>(query: any): Promise<T | null>;
  find<T>(query: any): Promise<T[]>;
  create<T>(data: any): Promise<T>;
  createMany<T>(data: any[]): Promise<T[]>;
  update<T>(id: number, data: any): Promise<T | null>;
  delete<T>(id: number): Promise<boolean>;
  filter(
    query: any,
    pageSize?: number,
    page?: number,
    fields?: any,
    sort?: any
  ): Promise<any>;
}
