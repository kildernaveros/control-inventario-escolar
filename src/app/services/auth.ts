import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;
  currentUser: User | null = null;

constructor(private auth: Auth) {
  // Inicializar el observable
  this.user$ = new Observable((observer) => {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
      observer.next(user);
      console.log('👤 Usuario actual:', user?.email || 'No autenticado');
    });
  });
  
  // Verificar usuario inmediatamente
  this.currentUser = this.auth.currentUser;
  console.log('🔍 Usuario en constructor:', this.currentUser?.email);
}
  // Registrar nuevo usuario
  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      console.log('✅ Usuario registrado:', userCredential.user.email);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('❌ Error al registrar:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Iniciar sesión
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      console.log('✅ Sesión iniciada:', userCredential.user.email);
      return { success: true, user: userCredential.user };
    } catch (error: any) {
      console.error('❌ Error al iniciar sesión:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Cerrar sesión
  async logout() {
    try {
      await signOut(this.auth);
      console.log('✅ Sesión cerrada');
      return { success: true };
    } catch (error: any) {
      console.error('❌ Error al cerrar sesión:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Obtener usuario actual
  getCurrentUser() {
    return this.currentUser;
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}