import { Controller, Get } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Unit } from './units.entity';
import { UnitsService } from './units.service';
import * as csv from 'csvtojson'
import { getManager, Not } from 'typeorm';
import { Logger } from '@nestjs/common';

@Crud({
  model: {
    type: Unit,
  },
  routes: {
    only: [
      'getManyBase',
      'getOneBase',
      'updateOneBase'
    ],
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    }
  },
  query: {
    sort: [{field: 'property', order: 'ASC'}],
    alwaysPaginate: true,
  }
})
@Controller('units')
export class UnitsController {
  protected readonly logger: Logger;

  constructor(public service: UnitsService) {
    this.logger = new Logger(this.constructor.name);
  }

  @Get('seed')
  async seedData() {
    const filePath = `${__dirname}/../seed/units.csv`
    this.logger.log(`filePath = ${filePath}`)

    const data = (await csv().fromFile(filePath)).map((unit) => ({
      ...unit,
      latitude: +unit.latitude,
      longitude: +unit.longitude,
      monthly_rate: +unit.monthly_rate,
      lease_term_months: +unit.lease_term_months,
      total_views: +unit.total_views,
    }))

    await getManager().transaction(async transactionalEntityManager => {
      const units = data.map((unit) => Unit.create(unit))

      transactionalEntityManager.delete(Unit, {id: Not(null)})
      
      await transactionalEntityManager.save(units);
    });

  }
}
