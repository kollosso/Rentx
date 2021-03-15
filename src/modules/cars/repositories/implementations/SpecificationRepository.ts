import Specification from '../../models/Specification';
import { ISpecificationsRepository, ICreateSpecificationDTO } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[]

  constructor() {
    this.specifications = [];
  }
  findByName(name: string): Specification {
    const specification = this.specifications.find((specification) => specification.name === name);

    return specification;
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, createdAt: new Date() });

    this.specifications.push(specification);
  }
}

export { SpecificationsRepository };
