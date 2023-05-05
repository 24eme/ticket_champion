import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandModel } from '../utils/types';
import { Commande } from '../typeorm/entities/Commande';
import * as fs from 'fs';
import { Repository } from 'typeorm';


@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande) private commandeRepository: Repository<Commande>,
  ){}

  async getDataFromjson(cheminFichier: string) {
    const data = JSON.parse(fs.readFileSync(cheminFichier, 'utf8')); 
    return { data };
  }


  createCommande(commandeDetails: CommandModel) {
    const newCommand = this.commandeRepository.create({...commandeDetails,});
    return this.commandeRepository.save(newCommand);
  }

  getCommandes() {
    return `This action returns all commande`;
  }

}