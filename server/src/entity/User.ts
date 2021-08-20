import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Group } from "./Group";
import { Review } from "./Reviews";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @ManyToOne(() => Group, (group) => group.users, { cascade: true })
  group: Group;

  @OneToMany(()=>Review, review=>review.user, {cascade:true, onDelete:"CASCADE"})
  reviews: Review
}
