import { IAuthRepository, LoginCredentials, RegisterCredentials } from '../../domain/repository/IAuthRepository';
import { User } from '../../domain/models/User';
import { firebaseSignIn, firebaseRegister, firebaseSignOut, firebaseUpdateProfile } from '../api/authApi';
import { mapFirebaseUserToUser } from '../mappers/userMapper';
import { auth } from '../../../../config/firebase';
import { SessionManager } from '../../../../shared/services/storage/SessionManager';

export class AuthRepositoryImpl implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<User> {
    const credential = await firebaseSignIn(credentials.email, credentials.password);
    const user = mapFirebaseUserToUser(credential.user);
    await SessionManager.saveSession({ uid: user.uid, email: user.email, displayName: user.displayName });
    return user;
  }

  async register(credentials: RegisterCredentials): Promise<User> {
    const credential = await firebaseRegister(credentials.email, credentials.password);
    await firebaseUpdateProfile(credentials.displayName);
    const user = mapFirebaseUserToUser(credential.user);
    user.displayName = credentials.displayName;
    await SessionManager.saveSession({ uid: user.uid, email: user.email, displayName: user.displayName });
    return user;
  }

  async logout(): Promise<void> {
    await firebaseSignOut();
    await SessionManager.clearSession();
  }

  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) {
      const session = await SessionManager.getSession();
      if (session) {
        return { uid: session.uid, email: session.email, displayName: session.displayName };
      }
      return null;
    }
    return mapFirebaseUserToUser(firebaseUser);
  }
}
