import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @Column({ nullable: false })
  authorId: string;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
