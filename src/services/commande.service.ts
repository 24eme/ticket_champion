import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, } from 'typeorm';
import { Commande } from 'src/typeorm/entities/Commande';
import { Client } from 'src/typeorm/entities/Client';
import { CommandModel } from 'src/utils/types';
import * as fs from 'fs';
import { Plat } from 'src/typeorm/entities/Plat';
import { Supplement } from 'src/typeorm/entities/Supplement';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande) private commandeRepository: Repository<Commande>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Plat) private platRepository: Repository<Plat>,
    @InjectRepository(Supplement) private supplementRepository : Repository<Supplement>,
  ){}
  
  async getDataFromjson(cheminFichier : string) {
    const data = JSON.parse(fs.readFileSync(cheminFichier, 'utf8')); 
    return { data };
  }

  createCommande(commandeDetails: CommandModel) {
    const newCommand = this.commandeRepository.create({ ...commandeDetails } as unknown as DeepPartial<Commande>);
    return this.commandeRepository.save(newCommand);
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


  create(createCommandeDto: CreateCommandeDto) {
    return 'This action adds a new commande';
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
