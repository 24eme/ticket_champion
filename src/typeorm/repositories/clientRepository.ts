import { Repository } from 'typeorm';
import { Client } from '../entities/Client';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientRepository {
    constructor(
        @InjectRepository(Client)
        private readonly repository: Repository<Client>,
      ) {}
  async createClient(nom: string, entreprise: string, telephone: string): Promise<Client> {
    const client = new Client();
    client.nom = nom;
    client.entreprise = entreprise;
    client.telephone = telephone;

    return await this.repository.save(client);
  }

  async getAllClients(): Promise<Client[]> {
    return await this.repository.find();
  }

  /*async getClientById(id: number): Promise<Client> {
    return await this.findOne(id);
  }*/

  /*async updateClient(id: number, nom: string, entreprise: string, telephone: string): Promise<Client> {
    const client = await this.findOne(id);
    client.nom = nom;
    client.entreprise = entreprise;
    client.telephone = telephone;

    return await this.save(client);
  }*/

  async deleteClient(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
