import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) { }
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id)

    return UserMap.toDTO(user)
  }
}

export { ProfileUserUseCase }
