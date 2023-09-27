import { MigrationInterface, QueryRunner } from 'typeorm';

export class NomDeLaMigration implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Code SQL pour créer la table "commandes" en fonction des spécifications.
    await queryRunner.query(`
      CREATE TABLE commandes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        id_utilisateur UUID NOT NULL,
        id_table UUID NOT NULL,
        date_heure TIMESTAMP NOT NULL,
        statut VARCHAR(20) NOT NULL,
        liste_produits JSONB NOT NULL,
        total NUMERIC(10, 2) NOT NULL,
        methode_paiement VARCHAR(20) NOT NULL,
        mode_paiement VARCHAR(20) NOT NULL,
        code_promotionnel VARCHAR(20),
        montant_reduction NUMERIC(10, 2)
      );
    `);
    await queryRunner.query(`
      ALTER TABLE commandes ADD CONSTRAINT fk_commandes_utilisateur
      FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id)
    `);
    await queryRunner.query(`
      ALTER TABLE commandes ADD CONSTRAINT fk_commandes_table
      FOREIGN KEY (id_table) REFERENCES tables(id)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Code SQL pour annuler les opérations effectuées dans up() en cas de rollback.
    await queryRunner.query(
      `ALTER TABLE commandes DROP CONSTRAINT fk_commandes_utilisateur`,
    );
    await queryRunner.query(
      `ALTER TABLE commandes DROP CONSTRAINT fk_commandes_table`,
    );
    await queryRunner.query(`DROP TABLE commandes;`);
  }
}
