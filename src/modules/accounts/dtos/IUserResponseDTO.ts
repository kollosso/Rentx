interface IUserResponseDTO {
  id: string
  name: string
  email: string
  avatar: string
  driverLicense: string
  avatar_url(): string
}

export { IUserResponseDTO }
