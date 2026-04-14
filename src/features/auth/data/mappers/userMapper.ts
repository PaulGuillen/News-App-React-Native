import { User as FirebaseUser } from 'firebase/auth';
import { User } from '../../domain/models/User';

export const mapFirebaseUserToUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email ?? '',
  displayName: firebaseUser.displayName ?? undefined,
  photoURL: firebaseUser.photoURL ?? undefined,
  createdAt: firebaseUser.metadata.creationTime,
});
