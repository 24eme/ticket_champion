import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import * as fs from 'fs';

@Injectable()
export class CommandeService {

  


  getViewName(page: string): string {
    switch (page) {
      case 'plats':
        return 'platsPage';
      case 'supplements':
        return 'produits';
      default:
        return 'error';
    }
  }


  async getPlatFromjson() {
    const data = JSON.parse(fs.readFileSync('config/restaurantsconfig.json', 'utf8')); 
    return { data };
  }

  async getSupplementFromJson() {
    const data = JSON.parse(fs.readFileSync('config/restaurantsconfig.json', 'utf8'));
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
