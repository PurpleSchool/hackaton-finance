import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeStatus1687087340481 implements MigrationInterface {
    name = 'AddTypeStatus1687087340481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."category_type_enum" AS ENUM('expense', 'income')`);
        await queryRunner.query(`ALTER TABLE "category" ADD "type" "public"."category_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."bill_type_enum" AS ENUM('expense', 'income')`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "type" "public"."bill_type_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."bill_status_enum" AS ENUM('canceled', 'completed', 'pending')`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "status" "public"."bill_status_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "UQ_4bb3fbb86fb58fe2de057ea32a7" UNIQUE ("name", "type")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "UQ_4bb3fbb86fb58fe2de057ea32a7"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."bill_status_enum"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "status" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."bill_type_enum"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD "type" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."category_type_enum"`);
    }

}
