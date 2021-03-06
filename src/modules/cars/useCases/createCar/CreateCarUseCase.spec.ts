import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })
  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name car',
      description: 'description car',
      brand: 'car',
      licensePlate: 'ABC-123',
      categoryId: 'category',
      dailyRate: 100,
      fineAmount: 100
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to create a car with exists license plate', async () => {
    await expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'description car',
        brand: 'car',
        licensePlate: 'ABC-123',
        categoryId: 'category',
        dailyRate: 100,
        fineAmount: 100,
      })
      await createCarUseCase.execute({
        name: 'Car2',
        description: 'description car',
        brand: 'car',
        licensePlate: 'ABC-123',
        categoryId: 'category',
        dailyRate: 100,
        fineAmount: 100,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to creat a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car2',
      description: 'description car',
      brand: 'car',
      licensePlate: 'ABC-123',
      categoryId: 'category',
      dailyRate: 100,
      fineAmount: 100
    })

    expect(car.available).toBe(true)
  })
})
