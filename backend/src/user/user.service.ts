import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findById(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) return null;
    return user;
  }

  async create(data: CreateUserDto) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException({
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    if (dto.email && dto.email !== user.email) {
      const existing = await this.repo.findOneBy({
        email: dto.email,
      });

      if (existing) {
        throw new BadRequestException({ message: "Email exists", code: "ALREADY_EXIST" });
      }
    }

    Object.assign(user, dto);

    return this.repo.save(user);
  }
}
