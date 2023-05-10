import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { CreatePlatDto } from 'src/commande/dto/create-plat-dto';
import { CreateSupplementtDto } from 'src/commande/dto/create-supplement-dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, } from 'typeorm';
import { Commande } from 'src/typeorm/entities/Commande';
import { Client } from 'src/typeorm/entities/Client';
import { CommandModel } from 'src/utils/types';
import * as fs from 'fs';
import { Plat } from 'src/typeorm/entities/Plat';
import { Supplement } from 'src/typeorm/entities/Supplement';
import { CommandeSupplement } from 'src/typeorm/entities/CommandeSupplement';
import { CommandePlat } from 'src/typeorm/entities/CommandePlat';


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

  //make a code refactoring for all those 3 functions cuz they look alike
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
            //nom : client.nom
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
      .addSelect('COUNT(commande.id_commande)', 'nombreCommandes')
      .groupBy('client.entreprise');

    return queryBuilder.getRawMany();
  }


  async create(createCommandeDto: CreateCommandeDto, createPlatDto : CreatePlatDto[], createSupplementtDto : CreateSupplementtDto[]) {
    const  montant_commande = createCommandeDto.montant_Commande;
    let client = new Client();
    client.id_client = createCommandeDto.id_client;
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
