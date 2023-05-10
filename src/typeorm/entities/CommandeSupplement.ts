import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn  } from "typeorm";
import { CommandePlat } from './CommandePlat';
import { Supplement } from './Supplement';

@Entity({ name: 'commande_supplement' })
export class CommandeSupplement {
  @PrimaryGeneratedColumn()
  id_commande_supplement: number;

  @ManyToOne(type => CommandePlat, commandePlat => commandePlat.commandeSupplements)
  @JoinColumn({ name: 'id_commande' })
  commandePlat: CommandePlat;

  @ManyToOne(type => Supplement, supplement => supplement.commandeSupplements)
  @JoinColumn({ name: 'nom_supplement' })
  supplement: Supplement;

  @Column()
  quantite: number;
}

