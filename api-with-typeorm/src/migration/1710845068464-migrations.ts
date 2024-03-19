import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710845068464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      ` 
      --Table Definition
      CREATE TABLE "user"  (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying NOT NULL
      );

      CREATE TABLE "post"  (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "title" character varying NOT NULL,
          "content" character varying NOT NULL,
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "authorId" uuid NOT NULL
      );
      `,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "post"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
  }
}
