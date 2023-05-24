import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { CreatePlatDto } from 'src/commande/dto/create-plat-dto';
import { CreateSupplementtDto } from 'src/commande/dto/create-supplement-dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, } from 'typeorm';
import { Commande } from 'src/typeorm/entities/Commande';
import { Client } from 'src/typeorm/entities/Client';
import { Plat } from 'src/typeorm/entities/Plat';
import { Supplement } from 'src/typeorm/entities/Supplement';
import { CommandeSupplement } from 'src/typeorm/entities/CommandeSupplement';
import { CommandePlat } from 'src/typeorm/entities/CommandePlat';
import * as fs from 'fs';


@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande) private commandeRepository: Repository<Commande>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Plat) private platRepository: Repository<Plat>,
    @InjectRepository(Supplement) private supplementRepository : Repository<Supplement>,
    @InjectRepository(CommandePlat) private CommandePlatRepository: Repository<CommandePlat>,
    @InjectRepository(CommandeSupplement) private commandeSupplementRepository : Repository<CommandeSupplement>,
  ){}
  
  async getDataFromjson(cheminFichier : string) {
    const data = JSON.parse(fs.readFileSync(cheminFichier, 'utf8')); 
    return { data };
  }

  async getClientsFromJson() {
    const data = JSON.parse(fs.readFileSync('config/clientsconfig.json', 'utf8'));
    return {data};
  }

  async fillClientsTable() {
    const entreprises = await this.getDataFromjson('config/clientsconfig.json');
    
      entreprises.data.entreprises.forEach((entreprise) => {
        entreprise.employes.forEach(async (employe) => {
         const client = new Client();
         client.nom = employe.name;
         client.id_client = employe.id;
         client.entreprise = entreprise.nomEntreprise;
         const find_client = await this.clientRepository.findOne({
          where: {
            id_client : client.id_client
          } 
         })
         if(find_client == undefined){
          this.clientRepository.save(client);
         }  
       });
     });      
  }

  async fillPlatsTable() {
    const platsSupplements = await this.getDataFromjson('config/restaurantsconfig.json');
    platsSupplements.data.restaurants.forEach((restaurant) => {
      restaurant.plats.forEach(async(plat) => {
        const plats = new Plat();
        plats.nom_plat = plat.nom;
        plats.prix_plat = plat.prix;
        const find_plat = await this.platRepository.findOne({
          where: {
            nom_plat : plats.nom_plat
          }
        })
        if(find_plat == undefined){
        this.platRepository.save(plats);
        }
      });
    });
  }

  async fillSupplementsTable() {
    const platsSupplements = await this.getDataFromjson('config/restaurantsconfig.json');
    platsSupplements.data.restaurants.forEach((restaurant) => {
      restaurant.supplements.forEach(async(supp) => {
        const supplements = new Supplement();
        supplements.nom_supplement= supp.nom;
        supplements.prix_supplement = supp.prix;
        const find_supplement = await this.supplementRepository.findOne({
          where: {
            nom_supplement : supplements.nom_supplement
          }
        })
        if(find_supplement == undefined)
        this.supplementRepository.save(supplements);
      });
    });
  }

  async getClientCommandesGroupedByEntreprise(): Promise<any> {
    const queryBuilder = this.clientRepository
      .createQueryBuilder('client')
      .leftJoinAndSelect('client.commandes', 'commande')
      .select('client.entreprise', 'entreprise')
      .addSelect('commande.heure_de_livraison', 'heure_de_livraison')
      .addSelect('COUNT(commande.id_commande)', 'nombreCommandes')
      .groupBy('client.entreprise')
      .addGroupBy('commande.heure_de_livraison')
      .having('COUNT(commande.id_commande) > :id', { id: 0 })
      .orderBy('commande.heure_de_livraison', 'ASC'); // Tri croissant
      

    return queryBuilder.getRawMany();
  }

  async getClientByEntreprise(entreprise: string): Promise<any> {
    const queryBuilder = this.clientRepository
      .createQueryBuilder('client')
      .select('client.*')
      .where('client.entreprise = :entreprise', { entreprise: entreprise });
    return queryBuilder.getRawMany();
  }  
  
  async getTotalCostCommandesGroupedByEntreprise(): Promise<any> {
    const queryBuilder = this.commandeRepository
      .createQueryBuilder('commande')
      .leftJoinAndSelect('commande.client', 'client')
      .select('client.entreprise', 'entreprise')
      .addSelect('SUM(commande.montant_commande)', 'sumCommandes')    
      .groupBy('client.entreprise');
    return queryBuilder.getRawMany();
  }


  async getTotalCostAndTypeGroupedByEntreprise(): Promise<any> {
    const queryBuilder = this.commandeRepository
      .createQueryBuilder('commande')
      .leftJoinAndSelect('commande.commandePlats', 'commande_plat')
      .leftJoinAndSelect('commande_plat.plat', 'plat')
      .leftJoinAndSelect('commande.commandeSupplements', 'commande_supplement')
      .leftJoinAndSelect('commande_supplement.supplement', 'supplement')
      .leftJoinAndSelect('commande.client', 'client')
      .select('client.entreprise', 'entreprise')
      .addSelect('plat.nom_plat', 'nom_plat')
      .addSelect('SUM(commande.montant_commande)', 'sumCommandesPlats')
      .addSelect('supplement.nom_supplement', 'nom_supplement')
      .addSelect('SUM(commande.montant_commande)', 'sumCommandesSupplements')
      .groupBy('client.entreprise')
      .addGroupBy('plat.nom_plat')
      .addGroupBy('supplement.nom_supplement')
      // .addSelect('SUM(sumCommandesSupplements.sumCommandesPlats', 'sumTotalCommandeInvoice')
    
    return queryBuilder.getRawMany();
  }


  async getCommandesInfoPerEntreprise(enterprise: string, time: string): Promise<Commande[]> {
    return this.commandeRepository
      .createQueryBuilder('commande')
      .leftJoinAndSelect('commande.client', 'client')
      .leftJoinAndSelect('commande.commandePlats', 'commande_plat')
      .leftJoinAndSelect('commande.commandeSupplements', 'commande_supplement')
      .leftJoinAndSelect('commande_plat.plat', 'plat')
      .leftJoinAndSelect('commande_supplement.supplement', 'supplement')
      .where('client.entreprise = :entreprise', { entreprise: enterprise })
      .andWhere('commande.heure_de_livraison = :heure_livraison', { heure_livraison: time })
      .getMany();
  }


  async create(createCommandeDto: CreateCommandeDto, createPlatDto : CreatePlatDto[], createSupplementtDto : CreateSupplementtDto[]) {
    const  montant_commande = createCommandeDto.montant_Commande;
    let client = new Client();
    client.id_client = createCommandeDto.id_client;
    client.commande_faite = true;
    const heure_de_livraison = createCommandeDto.date_livraison;
    const newCommand = await this.commandeRepository.save({  montant_commande, heure_de_livraison, client} as unknown as DeepPartial<Commande>);
    let commande = new Commande();
    commande.id_commande = newCommand.id_commande;
    for (let ele of createPlatDto) {

      let plat = new Plat();
      plat.nom_plat = ele.nom_plat;
      let quantite = ele.quantite;
      await this.CommandePlatRepository.save({commande, plat, quantite} as unknown as DeepPartial<CommandePlat>);
    }
    for (let supp of createSupplementtDto ){
      let supplement = new Supplement();
      supplement.nom_supplement = supp.nom_supplement;
      let quantite = supp.quantite;
      await this.commandeSupplementRepository.save({commande, supplement, quantite} as unknown as DeepPartial<CommandeSupplement>);
    }   
  }

  async markCommandeAsReady(idCommande: number): Promise<void> {
    // Récupéré la commande à partir de la base de données en utilisant l'ID
    const commande = new Commande();
    commande.id_commande = idCommande;
    const find_commande = await this.commandeRepository.findOne(
      {
        where: {
          id_commande : commande.id_commande
        }
      })
  
    if (find_commande) {
      commande.prete = true;   // Mise à jour de la valeur de `prete` de la commande
  
      await this.commandeRepository.save(commande);
    } else {
      // Géré le cas où la commande n'est pas trouvée
      throw new Error(`Commande avec l'ID ${idCommande} non trouvée.`);
    }
  }
  

  findAll() {
    return `This action returns all commande`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commande`;
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
