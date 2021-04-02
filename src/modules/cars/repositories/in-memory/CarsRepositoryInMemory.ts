import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id)
  }
  async findAvailable(categoryId?: string, brand?: string, name?: string): Promise<Car[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        ((brand && car.brand === brand) ||
          (categoryId && car.categoryId === categoryId) ||
          (name && car.name === name)
        )
      ) {
        return car
      }
      return null
    })

    return cars
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find(car => car.licensePlate === licensePlate)
  }
  cars: Car[] = []
  async create({ name, description, brand, categoryId, dailyRate, fineAmount, licensePlate, id }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name, description, brand, categoryId, dailyRate, fineAmount, licensePlate, id
    })

    this.cars.push(car)

    return car
  }

}

export { CarsRepositoryInMemory }
