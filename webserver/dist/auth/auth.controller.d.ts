import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: AuthDto): Promise<{
        id: number;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: AuthDto): Promise<void>;
}
