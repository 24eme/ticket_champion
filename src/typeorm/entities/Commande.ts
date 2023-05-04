import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Unique } from "typeorm";
import { Client } from './Client';
import { CommandePlat } from "./CommandePlat";
import { CommandeSupplement } from "./CommandeSupplement";

@Entity({ name: 'commandes' })
@Unique(['date_commande', 'client'])
export class Commande {
  @PrimaryGeneratedColumn()
  id_commande: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  date_commande: Date;

  @Column()
  montant_commande: number;

  @Column()
  heure_de_livraison: Date;

  @ManyToOne(() => Client, (client) => client.commandes)
  @JoinColumn({ name: 'id_client' })
  client: Client;

  @OneToMany(() => CommandePlat, (commandePlat) => commandePlat.commande)
  commandePlats: CommandePlat[];

  @OneToMany(() => CommandeSupplement, (commandeSupplement) => commandeSupplement.commandePlat)
  commandeSupplements: CommandeSupplement[];
}
