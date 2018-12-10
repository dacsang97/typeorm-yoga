import { MigrationInterface, QueryRunner, TableColumn, Table, TableForeignKey } from 'typeorm'

export class Category1544459358059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'todo',
      new TableColumn({
        name: 'categoryId',
        type: 'integer',
        isNullable: true,
      }),
    )
    await queryRunner.createTable(
      new Table({
        name: 'category',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'serial',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'character varying',
            isNullable: false,
          },
        ],
      }),
    )
    await queryRunner.createForeignKey(
      'todo',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = (await queryRunner.getTable('todo')) as Table
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('categoryId') !== -1,
    ) as TableForeignKey
    await queryRunner.dropForeignKey('todo', foreignKey)
    await queryRunner.dropColumn('todo', 'categoryId')
    await queryRunner.dropTable('category')
  }
}
