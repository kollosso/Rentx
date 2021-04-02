import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticatedUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticated user', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticatedUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driverLicense: "00001",
      email: "johndoe@mail.com",
      password: "123456",
      name: "John Doe",
    }

    await createUserUseCase.execute(user)

    const result = await authenticatedUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticatedUserUseCase.execute({
        email: 'noexist@mail.com',
        password: 'falsePassword'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driverLicense: "00001",
        email: "johndoe@mail.com",
        password: "123456",
        name: "John Doe",
      }

      await createUserUseCase.execute(user)

      await authenticatedUserUseCase.execute({
        email: user.email,
        password: "ErroPassword"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
