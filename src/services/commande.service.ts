import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from '../commande/dto/create-commande.dto';
import { UpdateCommandeDto } from '../commande/dto/update-commande.dto';
import * as fs from 'fs';
//import * from event.currentTarget;

@Injectable()
export class CommandeService {

  async getPlatFromjson() {
    const data = JSON.parse(fs.readFileSync('config/restaurantsconfig.json', 'utf8')); 
    return { data };
  }

  async getSupplementFromJson() {
    const data = JSON.parse(fs.readFileSync('config/restaurantsconfig.json', 'utf8'));
    return {data};
  }

  async getClientsFromJson() {
    const data = JSON.parse(fs.readFileSync('config/clientsconfig.json', 'utf8'));
    return {data};
  }

  
  async getInfo() {
    var plat_nom

    const platBoutons = document.querySelectorAll('.B1');
    platBoutons.forEach(button => {
      button.addEventListener('click', (event) => {
        const target = event.currentTarget as HTMLButtonElement;
        plat_nom = target.getAttribute('data-plat-nom'); } 
    )})

          return plat_nom;
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
