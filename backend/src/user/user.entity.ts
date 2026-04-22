import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "../posts/post.entity";
import { Exclude } from "class-transformer";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @Column({ type: "text", nullable: true })
  @Exclude()
  refreshTokenHash!: string | null;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  birthDay!: string;

  @Column({ nullable: true })
  phone!: string;

  @Column({ nullable: true })
  bio!: string;

  @Column({ nullable: true })
  avatar!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
