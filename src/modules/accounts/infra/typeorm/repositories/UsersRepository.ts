import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)

    return user
  }
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user
  }

  async create({ id, name, email, password, avatar, driverLicense }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id, name, email, password, avatar, driverLicense
    })

    await this.repository.save(user)

  }

}

export { UsersRepository }
