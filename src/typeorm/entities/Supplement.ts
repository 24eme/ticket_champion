import { Column, Entity, PrimaryGeneratedColumn, OneToMany  } from "typeorm";
import { CommandeSupplement } from "./CommandeSupplement";


@Entity({ name: 'supplements' })
export class Supplement {
  @PrimaryGeneratedColumn()
  id_supplement: number;

  @Column({ nullable : false })
  nom_supplement: string;

  @Column({ nullable : false })
  prix_supplement: number;

  @OneToMany(() => CommandeSupplement, (commandeSupplement) => commandeSupplement.supplement)
  commandeSupplements: CommandeSupplement[];
}