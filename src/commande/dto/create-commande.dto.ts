export class CreateCommandeDto {
    nom_Client : string;
    id_client : number;
    nom_employee : string;
    nom_plat : string[];
    nom_Supplement : string[];
    montant_Commande : number;
    date_livraison : string;
}
