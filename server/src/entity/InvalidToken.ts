import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InvalidToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({
    type: "timestamp",
    default: () => "(NOW() + interval '14 day')",
  })
  expiry: string;
}
