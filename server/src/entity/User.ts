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

  @Column({ type: "text", nullable: true })
  resetPasswordToken!: string | null;

  @Column({ type: "timestamptz", nullable: true })
  resetPasswordExpiry!: Date | null;

  @ManyToOne(() => Group, (group) => group.users, { cascade: true })
  group: Group;

  @OneToMany(() => Review, (review) => review.user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  reviews: Review;
}
