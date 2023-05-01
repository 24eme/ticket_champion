import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class SupplementsService {
    async getSupplementFromJson() {
        const data = JSON.parse(fs.readFileSync('config/restaurantsconfig.json', 'utf8'));
        return {data};
      }
}
