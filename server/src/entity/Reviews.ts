import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Group } from "./Group";
import { User } from "./User";

@Entity()
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contentId: number;

  @Column()
  contentName: string;

  @Column()
  imageUrl: string;

  @Column({
    type: "float4",
  })
  rating: number;

  @Column()
  reviewText: string;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Group, (group) => group.reviews, { onDelete: "CASCADE" })
  group: Group;
}
