import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Company {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column({ nullable: true }) address: string;
  @Column({ nullable: true }) revenue: number;
  // @Column({ nullable: true }) foo: number;
}
