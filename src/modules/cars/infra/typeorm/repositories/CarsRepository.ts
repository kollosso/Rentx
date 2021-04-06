import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }
  async updatedAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder().update().set({ available })
      .where("id = :id").setParameters({ id }).execute()
  }
  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id)

    return car
  }
  async findAvailable(brand?: string, categoryId?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder('c')
      .where('available = :available', { available: true })

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand })
    }
    if (name) {
      carsQuery.andWhere("name = :name", { name })
    }
    if (categoryId) {
      carsQuery.andWhere("categoryId = :categoryId", { categoryId })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async create({
    name,
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    specifications,
    id
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      specifications,
      id
    })

    await this.repository.save(car)

    return car
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      licensePlate
    })

    return car
  }

}

export { CarsRepository }
