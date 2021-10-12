import { Column, Entity, BaseEntity, PrimaryColumn } from "typeorm";

@Entity()
export class Anime extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  img_url: string;

  @Column()
  description: string;
}

@Entity()
export class Manga extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  img_url: string;

  @Column()
  description: string;
}
