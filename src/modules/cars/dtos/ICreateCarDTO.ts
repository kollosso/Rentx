import Specification from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
  name: string
  description: string
  dailyRate: number
  licensePlate: string
  fineAmount: Number
  brand: string
  categoryId: string
  specifications?: Specification[]
  id?: string
}
export { ICreateCarDTO }
