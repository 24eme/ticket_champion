import { Column, Entity, PrimaryGeneratedColumn, OneToMany  } from "typeorm";

import { CommandePlat } from "./CommandePlat";

@Entity({ name: 'plats' })
export class Plat {
  @PrimaryGeneratedColumn()
  id_plat: number;

  @Column({ nullable : false })
  nom_plat: string;

  @Column({ nullable : false })
  prix_plat: number;

  @OneToMany(() => CommandePlat, (commandePlat) => commandePlat.plat)
  commandePlats: CommandePlat[];
}