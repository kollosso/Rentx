import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory"
import { AppError } from "@shared/errors/AppError"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let dateProvider: DayjsDateProvider
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let mailProviderInMemory: MailProviderInMemory

describe('Send forgot mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProviderInMemory = new MailProviderInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    )
  })
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = spyOn(mailProviderInMemory, 'sendMail')
    await usersRepositoryInMemory.create({
      name: 'John doe',
      email: 'johndoe@mail.com',
      password: '123456',
      driverLicense: 'ABC-123'
    })

    await sendForgotPasswordMailUseCase.execute('johndoe@mail.com')

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('non-exists@email.com')
    ).rejects.toEqual(new AppError('User does not exists'))
  })
  it('should be able to create an users token', async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      name: 'John doe',
      email: 'johndoe@mail.com',
      password: '123456',
      driverLicense: 'ABC-123'
    })

    await sendForgotPasswordMailUseCase.execute('johndoe@mail.com')

    expect(generateTokenMail).toBeCalled()
  })
})
