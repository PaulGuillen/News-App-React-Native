import { IAuthRepository, RegisterCredentials } from '../repository/IAuthRepository';
import { User } from '../models/User';

export class RegisterUseCase {
  constructor(private readonly authRepository: IAuthRepository) {}

  async execute(credentials: RegisterCredentials): Promise<User> {
    return this.authRepository.register(credentials);
  }
}
