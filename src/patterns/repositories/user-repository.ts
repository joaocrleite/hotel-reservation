import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findUserById(id: string): Promise<User|null>
  findUserByEmailOrCpf(email?: string, cpf?: string): Promise<User|null>
  updateUserData(data: Prisma.UserUpdateInput): Promise<User|null>
}