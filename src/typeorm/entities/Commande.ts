import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Unique } from "typeorm";
import { Client } from './Client';
import { CommandePlat } from "./CommandePlat";
import { CommandeSupplement } from "./CommandeSupplement";

@Entity({ name: 'commandes' })
@Unique(['date_commande', 'client']) //pour empecher un client de faire plusieurs commandes / jour

export class Commande {
  @PrimaryGeneratedColumn()
  id_commande: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  date_commande: Date;

  @Column({default : 0})
  montant_commande: number;

  @Column({default : ""})
  heure_de_livraison: string;

  @Column({default : false})
  prete : boolean;

  @ManyToOne(() => Client, (client) => client.commandes)
  @JoinColumn()
  client: Client;

  @OneToMany(() => CommandePlat, (commandePlat) => commandePlat.commande)
  commandePlats: CommandePlat[];

  @OneToMany(() => CommandeSupplement, (commandeSupplement) => commandeSupplement.commande)
  commandeSupplements: CommandeSupplement[];
    }