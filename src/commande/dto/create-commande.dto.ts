import { CreatePlatDto } from 'src/commande/dto/create-plat-dto';
import { CreateSupplementtDto } from 'src/commande/dto/create-supplement-dto';
export class CreateCommandeDto {
   // nom_Client : string;
    id_client : number;
    nom_employee : string;
    plats : CreatePlatDto[];
    supplements : CreateSupplementtDto[];
    montant_Commande : number;
    date_livraison : string;
}


