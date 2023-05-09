import { Column, Entity, PrimaryGeneratedColumn, OneToMany  } from "typeorm";
import { CommandeSupplement } from "./CommandeSupplement";


@Entity({ name: 'supplements' })
export class Supplement {
  @PrimaryGeneratedColumn()
  id_supplement: number;

  @Column()
  nom_supplement: string;

  @Column()
  prix_supplement: number;

  @OneToMany(() => CommandeSupplement, (commandeSupplement) => commandeSupplement.supplement)
  commandeSupplements: CommandeSupplement[];
}