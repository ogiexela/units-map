import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Unit extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') // sql
  // @ObjectIdColumn() // mongodb
  id: string;

  @Column()
  property: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, default: 0, })

  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, default: 0, })
  longitude: number;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  monthly_rate: number;

  @Column()
  lease_term_months: number;

  @Column()
  total_views: number;

  @Column({
    default: 0
  })
  interest: number;
}
