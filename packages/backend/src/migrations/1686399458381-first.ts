import { MigrationInterface, QueryRunner } from "typeorm";

export class First1686399458381 implements MigrationInterface {
    name = 'First1686399458381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "owner_id" integer NOT NULL, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "bill_id" integer NOT NULL, "category_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "user_id" integer NOT NULL, "account_id" integer NOT NULL, "currency_id" integer NOT NULL, "type" integer NOT NULL, "status" integer NOT NULL, "date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account" ADD CONSTRAINT "FK_7e86daab9d155ec4cc3fd654454" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_322dcdc435a249d1219e6abc5a1" FOREIGN KEY ("bill_id") REFERENCES "bill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_abbe63b71ee4193f61c322ab497" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_34e537d6261c55286aa58921ada" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_172dde0ed2b16ccb1aae4b06500" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_7901ba10586bef0cb83e696e8ec" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_7901ba10586bef0cb83e696e8ec"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_172dde0ed2b16ccb1aae4b06500"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_34e537d6261c55286aa58921ada"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_abbe63b71ee4193f61c322ab497"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_322dcdc435a249d1219e6abc5a1"`);
        await queryRunner.query(`ALTER TABLE "account" DROP CONSTRAINT "FK_7e86daab9d155ec4cc3fd654454"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "account"`);
    }

}
