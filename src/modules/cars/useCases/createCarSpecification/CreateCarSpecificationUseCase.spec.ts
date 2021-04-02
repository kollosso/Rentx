import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationRepositoryInMemory: SpecificationRepositoryInMemory

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory()
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationRepositoryInMemory)
  })
  it('should be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '1234'
      const specifications_id = ["54321"]
      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to add a new specification to he car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 001",
      description: "Car description",
      dailyRate: 140,
      licensePlate: "ABC-123",
      fineAmount: 100,
      brand: "carBrand01",
      categoryId: "12345"
    })

    const specification = await specificationRepositoryInMemory.create({
      name: 'test',
      description: 'test'
    })

    const specifications_id = [specification.id]
    const specificationCar = await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id })

    expect(specificationCar).toHaveProperty('specifications')
    expect(specificationCar.specifications.length).toBe(1)
  })
})
