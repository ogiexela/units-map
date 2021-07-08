import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Unit } from './units.entity';

@Injectable()
export class UnitsService extends TypeOrmCrudService<Unit> {
  constructor(@InjectRepository(Unit) repo) {
    super(repo);
  }
}
