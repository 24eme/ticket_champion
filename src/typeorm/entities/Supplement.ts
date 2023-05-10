import { Column, Entity, PrimaryColumn, OneToMany  } from "typeorm";
import { CommandeSupplement } from "./CommandeSupplement";


@Entity({ name: 'supplements' })
export class Supplement {
  
  @PrimaryColumn()
  nom_supplement: string;

  @Column()
  prix_supplement: number;

  @OneToMany(() => CommandeSupplement, (commandeSupplement) => commandeSupplement.supplement)
  commandeSupplements: CommandeSupplement[];
}