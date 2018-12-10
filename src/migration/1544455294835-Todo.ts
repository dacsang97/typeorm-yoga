import { MigrationInterface, QueryRunner } from 'typeorm'

export class Todo1544455294835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        CREATE TABLE todo("id" SERIAL NOT NULL PRIMARY KEY, "title" character varying, "content"  character varying)
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS todo
      `)
  }
}
