import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
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

  @OneToMany(() => Review, (review) => review.group, { onDelete: "CASCADE" })
  reviews: Review;

  @OneToMany(() => GroupInviteLink, (link) => link.group)
  links: GroupInviteLink[];
}

@Entity()
export class GroupInviteLink extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  joinGroupToken: string;

  @Column({ type: "timestamptz", nullable: true })
  joinGroupExpire: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Group, (group) => group.links)
  group: Group;
}
