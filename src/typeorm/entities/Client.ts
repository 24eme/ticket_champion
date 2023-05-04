import { Column, Entity, PrimaryGeneratedColumn,OneToMany  } from "typeorm";
import { Commande  } from "./Commande";

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id_client: number;

  @Column()
  nom: string;

  @Column()
  entreprise: string;

  @Column({ nullable : true })
  telephone: string;

  @OneToMany(() => Commande, (commande) => commande.client)
  commandes: Commande[];
}