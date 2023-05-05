import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Commande } from 'src/typeorm/entities/Commande';
import { CommandModel } from 'src/utils/types';
import * as fs from 'fs';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Commande) private commandeRepository: Repository<Commande>,
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
