import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateSpecifications1616433563803 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "specifications",
        columns: [
          {
            name: "id",
            type: 'uuid',
            isPrimary: true
          },
          {
            name: "name",
            type: 'varchar',
          },
          {
            name: "description",
            type: 'varchar',
          },
          {
            name: "createdAt",
            type: 'timestamp',
            default: 'now()'
          },
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('specifications')
  }

}
