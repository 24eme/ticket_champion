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
  connectionManager: any;
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
    //remplir des données dans commandes model
    const newCommand = this.commandeRepository.create({ ...commandeDetails } as unknown as DeepPartial<Commande>);
    return this.commandeRepository.save(newCommand);
  }
  //make a code refactoring for all those 3 functions cuz they look alike
  async fillClientsTable() {
    //modyfy the code to avoid filling the table with same client many times
    const entreprises = await this.getDataFromjson('config/clientsConfig.json');
    entreprises.data.entreprises.forEach((entreprise) => {
      entreprise.employes.forEach((employe) => {
        const client = new Client();
        client.nom = employe.nom;
        client.entreprise = entreprise.nomEntreprise;
        this.clientRepository.save(client);
      });
    });
  }
  async fillPlatsTable() {
    const platsSupplements = await this.getDataFromjson('config/restaurantsconfig.json');
    platsSupplements.data.restaurants.forEach((restaurant) => {
      restaurant.plats.forEach((plat) => {
        const plats = new Plat();
        plats.nom_plat = plat.nom_plat;
        console.log(plats.nom_plat )
        plats.prix_plat = plat.prix_plat;
        console.log(plats.prix_plat )
        this.platRepository.save(plats);
      });
    });
  }

  async fillSupplementsTable() {
    const platsSupplements = await this.getDataFromjson('config/restaurantsconfig.json');
    platsSupplements.data.restaurants.forEach((restaurant) => {
      restaurant.supplements.forEach((supp) => {
        const supplements = new Supplement();
        supplements.nom_supplement= supp.nom_supp;
        console.log(supplements.nom_supplement )
        supplements.prix_supplement = supp.prix_supp;
        console.log(supplements.prix_supplement )
        this.supplementRepository.save(supplements);
      });
    });
  }

  
  
  
  create(CreateCommandeDto: CreateCommandeDto) {
    return 'This action adds a new commande';
  }

  findAll() {
    return `This action returns all commande`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commande`;
  }

  Date(id: number, UpdateCommandeDto: UpdateCommandeDto) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
