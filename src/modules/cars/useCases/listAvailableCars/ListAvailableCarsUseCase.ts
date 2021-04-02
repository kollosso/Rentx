import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  categoryId?: string
  brand?: string
  name?: string
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) { }
  async execute({ brand, categoryId, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(brand, categoryId, name)

    return cars
  }
}

export { ListAvailableCarsUseCase }
