import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Commande } from '../entities/Commande';

@Injectable()
export class CommandeRepository {
  constructor(
    @InjectRepository(Commande)
    private readonly repository: Repository<Commande>,
  ) {}

  async create(Commande: Commande): Promise<Commande> {
    return this.repository.save(Commande);
  }

  async findAll(): Promise<Commande[]> {
    return this.repository.find();
  }

  /*async findOne(id: number): Promise<Commande> {
    return this.repository.findOne({ id });
  }*/

 /* async update(id: number, Commande: Commande): Promise<Commande> {
    await this.repository.update(id, Commande);
    return this.repository.findOne(id);
  }*/

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
