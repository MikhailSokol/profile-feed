import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  text!: string;

  @Column("simple-array", { nullable: true })
  images!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  userId!: number;
}
