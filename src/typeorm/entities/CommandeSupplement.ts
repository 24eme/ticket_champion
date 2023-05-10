import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn  } from "typeorm";
import { CommandePlat } from './CommandePlat';
import { Supplement } from './Supplement';
import { Commande } from "./Commande";

@Entity({ name: 'commande_supplement' })
export class CommandeSupplement {
  @PrimaryGeneratedColumn()
  id_commande_supplement: number;

  @ManyToOne(type => Commande, commande => commande.commandeSupplements)
  @JoinColumn({ name: 'id_commande' })
  commande: Commande;

  @ManyToOne(type => Supplement, supplement => supplement.commandeSupplements)
  @JoinColumn({ name: 'nom_supplement' })
  supplement: Supplement;

  @Column()
  quantite: number;
}

