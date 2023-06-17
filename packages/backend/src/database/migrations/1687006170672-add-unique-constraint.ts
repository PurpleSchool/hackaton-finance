import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraint1687006170672 implements MigrationInterface {
    name = 'AddUniqueConstraint1687006170672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency" ADD CONSTRAINT "UQ_723472e41cae44beb0763f4039c" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "currency" DROP CONSTRAINT "UQ_723472e41cae44beb0763f4039c"`);
    }

}
