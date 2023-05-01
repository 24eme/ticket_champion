import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity({ name : 'commandes'})
export class Commande {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    nomclient : string;

    @Column({type : "datetime"})
    date : Date;

    @Column()
    nom_plat : string; 

    @Column()
    supplement : string;

    @Column({type : "datetime"})
    heure_de_livraison : Date;
}