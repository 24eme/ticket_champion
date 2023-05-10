import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn  } from "typeorm";
import { Commande } from './Commande';
import { Plat } from "./Plat";
import { CommandeSupplement } from "./CommandeSupplement";


@Entity({ name: 'commande_plat' })
export class CommandePlat {
  
  @PrimaryGeneratedColumn()
  id_commande_plat: number;

  @ManyToOne(() => Commande, (commande) => commande.commandePlats)
  @JoinColumn({ name: 'id_commande' })
  commande: Commande;

  @ManyToOne(() => Plat, (plat) => plat.commandePlats)
  @JoinColumn({ name: 'nom_plat' })
  plat: Plat;

  @Column()
  quantite: number;
}