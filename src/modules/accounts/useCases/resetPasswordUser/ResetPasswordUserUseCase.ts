import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvide: IDateProvider,
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) { }
  async execute({ token, password }: IRequest) {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid!')
    }

    if (this.dateProvide.compareIfBefore(userToken.expires_date, this.dateProvide.dateNow())) {
      throw new AppError('Token expired')
    }

    const user = await this.userRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.userRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase }
