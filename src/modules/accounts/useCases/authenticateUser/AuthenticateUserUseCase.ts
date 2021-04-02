import { inject, injectable } from "tsyringe";
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import { IUserRepository } from "../../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
}

interface IRequest {
  email: string
  password: string
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository
  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Email or password incorrect', 401)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect', 401)
    }

    const token = sign({}, "secretKey", {
      subject: user.id,
      expiresIn: '1d'
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email,
        name: user.name
      }
    }

    return tokenReturn
  }
}

export { AuthenticateUserUseCase }
