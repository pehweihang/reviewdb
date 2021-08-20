import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Review } from "./Reviews";
import { User } from "./User";

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.group, {
    onDelete: "SET NULL",
  })
  users: User[];

  @OneToMany(()=>Review, review=>review.group, {onDelete:"CASCADE"})
  reviews: Review
}
