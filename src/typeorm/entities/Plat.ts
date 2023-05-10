import { Column, Entity, OneToMany, PrimaryColumn  } from "typeorm";

import { CommandePlat } from "./CommandePlat";

@Entity({ name: 'plats' })
export class Plat {

  @PrimaryColumn()
  nom_plat: string;

  @Column()
  prix_plat: number;

  @OneToMany(() => CommandePlat, (commandePlat) => commandePlat.plat)
  commandePlats: CommandePlat[];
}