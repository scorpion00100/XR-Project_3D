import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Écrivez ici le code SQL pour créer la table "products" en fonction des spécifications.

    await queryRunner.query(`
      CREATE TABLE products (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NOT NULL,
        price NUMERIC(10, 2) CHECK (price >= 0) NOT NULL,
        category ENUM ('Cocktail Classique', 'Cocktail Signature', 'Autre') NOT NULL,
        ingredients TEXT[] NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Écrivez ici le code SQL pour annuler les opérations effectuées dans up() en cas de rollback.
    await queryRunner.query(`DROP TABLE products;`);
  }
}
