export interface IUserEntity {
  id: number;
  name: string;
  email?: string;
  password?: string;
  otp?: string;
  isActive?: boolean;
  selectedCategories: [number];
  createdAt?: Date;
}
