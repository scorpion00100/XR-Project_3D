import { MigrationInterface, QueryRunner } from 'typeorm';

export class NomDeLaMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Code SQL pour créer la table "avis" en fonction des spécifications.
    await queryRunner.query(`
      CREATE TABLE avis (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        id_utilisateur UUID NOT NULL,
        id_produit UUID NOT NULL,
        evaluation SMALLINT CHECK (evaluation >= 1 AND evaluation <= 5) NOT NULL,
        commentaire TEXT,
        experience_ar_evaluee UUID
      );
    `);
    await queryRunner.query(`
      ALTER TABLE avis ADD CONSTRAINT fk_avis_utilisateur
      FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id)
    `);
    await queryRunner.query(`
      ALTER TABLE avis ADD CONSTRAINT fk_avis_produit
      FOREIGN KEY (id_produit) REFERENCES produits(id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Code SQL pour annuler les opérations effectuées dans up() en cas de rollback.
    await queryRunner.query(
      `ALTER TABLE avis DROP CONSTRAINT fk_avis_utilisateur`,
    );
    await queryRunner.query(`ALTER TABLE avis DROP CONSTRAINT fk_avis_produit`);
    await queryRunner.query(`DROP TABLE avis;`);
  }
}
