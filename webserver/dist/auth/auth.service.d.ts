import { User } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(dto: AuthDto): Promise<User>;
    login(dto: AuthDto): Promise<void>;
    findUser(email: string): Promise<User | null>;
}
