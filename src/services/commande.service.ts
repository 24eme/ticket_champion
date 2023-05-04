import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandModel } from '../utils/types';
import { Commande } from '../typeorm/entities/Commande';
import { UpdateCommandeDto } from '../commande/dto/updateCommande.dto';
import * as fs from 'fs';
import { Repository } from 'typeorm';


@Injectable()
export class CommandeService {
  constructor(
    // @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Commande) private commandeRepository: Repository<Commande>,
  //   @InjectRepository(Plat) private platRepository: Repository<Plat>,
  //  @InjectRepository(Supplement) private supplementRepository: Repository<Supplement>,
  ){}

  //add params to below fonction
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

  /*findOne(id: number) {
    return `This action returns a #${id} commande`;
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }*/
}
