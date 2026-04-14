import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../../../../config/firebase';

export const firebaseSignIn = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const firebaseRegister = (email: string, password: string): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const firebaseUpdateProfile = (displayName: string): Promise<void> => {
  if (!auth.currentUser) throw new Error('No user logged in');
  return updateProfile(auth.currentUser, { displayName });
};

export const firebaseSignOut = (): Promise<void> => {
  return signOut(auth);
};
