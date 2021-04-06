import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

interface IRequest {
  name: string
  description: string
  dailyRate: number
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }
  async execute({ name, description, brand, categoryId, dailyRate, fineAmount, licensePlate }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(licensePlate)

    if (carAlreadyExists) {
      throw new AppError('Car already exists!')
    }

    const car = await this.carsRepository.create({
      name, description, brand, categoryId, dailyRate, fineAmount, licensePlate
    })

    return car
  }
}

export { CreateCarUseCase }
