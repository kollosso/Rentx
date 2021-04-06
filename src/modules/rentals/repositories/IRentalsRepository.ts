import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/entities/Rental";

interface IRentalsRepository {
  findOpenByCar(car_id: string): Promise<Rental>
  findOpenRentalByUser(user_id: string): Promise<Rental>
  create(data: ICreateRentalDTO): Promise<Rental>
  findById(id: string): Promise<Rental>
  findByUser(user_id: string): Promise<Rental[]>
}

export { IRentalsRepository }
