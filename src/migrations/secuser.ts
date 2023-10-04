import { MigrationInterface, QueryRunner } from 'typeorm';

export class Secuser implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Code SQL pour créer la table "utilisateurs" en fonction des spécifications.
    await queryRunner.query(`
      CREATE TABLE utilisateurs (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        nom_prenom VARCHAR(50) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        mot_de_passe VARCHAR(255) NOT NULL,
        date_naissance DATE,
        numero_telephone VARCHAR(15),
        photo_profil VARCHAR(255)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Code SQL pour annuler les opérations effectuées dans up() en cas de rollback.
    await queryRunner.query(`DROP TABLE utilisateurs;`);
  }
}
