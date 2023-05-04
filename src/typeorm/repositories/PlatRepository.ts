import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plat } from '../entities/Plat';

@Injectable()
export class PlatRepository {
  constructor(
    @InjectRepository(Plat)
    private readonly repository: Repository<Plat>,
  ) {}

  async create(plat: Plat): Promise<Plat> {
    return this.repository.save(plat);
  }

  async findAll(): Promise<Plat[]> {
    return this.repository.find();
  }

  /*async findOne(id: number): Promise<Plat> {
    return this.repository.findOne({ id });
  }*/

 /* async update(id: number, plat: Plat): Promise<Plat> {
    await this.repository.update(id, plat);
    return this.repository.findOne(id);
  }*/

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
