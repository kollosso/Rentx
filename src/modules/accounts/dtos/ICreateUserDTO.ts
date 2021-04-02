interface ICreateUserDTO {
  id?: string
  name: string
  password: string
  email: string
  avatar?: string
  driverLicense: string
}

export { ICreateUserDTO }
