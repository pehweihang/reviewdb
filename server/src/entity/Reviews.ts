import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Group } from "./Group";
import { User } from "./User";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  rating: number;

  @Column()
  reviewText: string;

  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
  })
  user: User;

  @OneToOne(() => Group, (group) => group.id, { onDelete: "CASCADE" })
  group_id: number;
}
