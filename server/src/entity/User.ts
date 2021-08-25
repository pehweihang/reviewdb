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
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ type: "timestamptz", nullable: true })
  resetPasswordExpiry: Date;

  @ManyToOne(() => Group, (group) => group.users, { cascade: true })
  group: Group;

  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  reviews: Review;
}
