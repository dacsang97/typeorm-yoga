import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm'

export class Comment1544455969948 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.addColumn(
      'todo',
      new TableColumn({
        name: 'commentId',
        type: 'integer',
      }),
    )
    await queryRunner.createTable(
      new Table({
        name: 'comment',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'serial',
            isNullable: false,
          },
          {
            name: 'content',
            type: 'character varying',
            isNullable: false,
          },
        ],
      }),
    )
    await queryRunner.createForeignKey(
      'todo',
      new TableForeignKey({
        columnNames: ['commentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'comment',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = (await queryRunner.getTable('todo')) as Table
    const foreignKey = table.foreignKeys.find(
      fk => fk.columnNames.indexOf('commentId') !== -1,
    ) as TableForeignKey
    await queryRunner.dropForeignKey('todo', foreignKey)
    await queryRunner.dropColumn('todo', 'commentId')
    await queryRunner.dropTable('comment')
  }
}
