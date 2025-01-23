import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';
import {compare, genSalt, hash} from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createUser(dto: AuthDto): Promise<User> {
        const salt = await genSalt(10);
        const newUser = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash: await hash(dto.password, salt)
            }
        })
        console.log(newUser);
        
        return newUser;
    }

    async login(dto: AuthDto) {
        
    }

    async findUser(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {email}
        })
        return user;
    }
}
