import dayjs from 'dayjs'

import { AppError } from "@shared/errors/AppError"

import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

let createRentalUseCase: CreateRentalUseCase
let rentalRepositoryInMemory: RentalRepositoryInMemory
let dayjsDateProvider: DayjsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create Rental', () => {
  const dayAdd24hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory()
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayjsDateProvider = new DayjsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory)
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car 01",
      description: "Super car 01",
      licensePlate: 'ABC-123',
      brand: "XPTO",
      dailyRate: 100,
      fineAmount: 144,
      categoryId: '1234'
    })
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })
  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalRepositoryInMemory.create({
      car_id: '11111',
      expected_return_date: dayAdd24hours,
      user_id: '12345'
    })

    await expect(createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayAdd24hours
    })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  })
  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalRepositoryInMemory.create({
      car_id: '121212',
      expected_return_date: dayAdd24hours,
      user_id: '12345'
    })

    await expect(createRentalUseCase.execute({
      user_id: '54321',
      car_id: '121212',
      expected_return_date: dayAdd24hours
    })

    ).rejects.toEqual(new AppError("Car is unavailable"))
  })
  it('should not be able to create a new rental with  invalid return time', async () => {
    await expect(createRentalUseCase.execute({
      user_id: '54321',
      car_id: '121212',
      expected_return_date: dayjs().toDate()
    })
    ).rejects.toEqual(new AppError('Invalid return time'))
  })
})
