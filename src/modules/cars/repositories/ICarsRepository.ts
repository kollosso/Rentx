import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(licensePlate: string): Promise<Car>
  findAvailable(categoryId?: string, brand?: string, name?: string): Promise<Car[]>
  findById(id: string): Promise<Car>
  updatedAvailable(id: string, available: boolean): Promise<void>
}

export { ICarsRepository }
