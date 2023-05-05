import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, } from 'typeorm';
import { Commande } from 'src/typeorm/entities/Commande';
import { Client } from 'src/typeorm/entities/Client';
import { CommandModel } from 'src/utils/types';
import * as fs from 'fs';

@Injectable()
export class CommandeService {
  connectionManager: any;
  constructor(
    @InjectRepository(Commande) private commandeRepository: Repository<Commande>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
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

  async fillClientsTable() {
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
