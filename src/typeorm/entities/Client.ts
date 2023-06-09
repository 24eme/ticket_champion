import { Column, Entity, PrimaryColumn,OneToMany  } from "typeorm";
import { Commande  } from "./Commande";

@Entity({ name: 'clients' })
export class Client {
  @PrimaryColumn()
  id_client: number;

  @Column()
  nom: string;

  @Column()
  entreprise: string;

  @Column({ nullable : true })
  telephone: string;

  @Column({default : false})
  commande_faite : boolean;

  @Column({default : 0})
  nb_tickets : number;

  @OneToMany(() => Commande, (commande) => commande.client)
  commandes: Commande[];
}


