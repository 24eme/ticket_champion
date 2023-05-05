// import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

// @Entity({ name : 'commandes'})
// export class Commande {
//     @PrimaryGeneratedColumn()
//     id : number;
    
//     @Column()
//     nomclient : string;

//     @Column({type : "datetime"})
//     date : Date;

//     @Column()
//     nom_plat : string; 

//     @Column()
//     supplement : string;

//     @Column({type : "datetime"})
//     heure_de_livraison : Date;
// }


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

  // NULLABLE TRUE A MODIFIER : METTRE VALEUR PAR DEFAULT (prix_plat ??) 
  @Column({ nullable:true })
  montant_commande: number;

    // NULLABLE TRUE A MODIFIER : METTRE VALEUR PAR DEFAULT

  @Column({nullable:true})
  heure_de_livraison: Date;

  @ManyToOne(() => Client, (client) => client.commandes)
  @JoinColumn({ name: 'id_client' })
  client: Client;

  @OneToMany(() => CommandePlat, (commandePlat) => commandePlat.commande)
  commandePlats: CommandePlat[];

  @OneToMany(() => CommandeSupplement, (commandeSupplement) => commandeSupplement.commandePlat)
  commandeSupplements: CommandeSupplement[];
}