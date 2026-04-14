import { IAuthRepository, LoginCredentials } from '../repository/IAuthRepository';
import { User } from '../models/User';

export class LoginUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<User> {
    return this.authRepository.login(credentials);
  }
}
