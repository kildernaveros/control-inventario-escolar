import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { InventarioItem } from '../models/inventario.model';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private collectionName = 'inventario';
  items$!: Observable<InventarioItem[]>;

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
    console.log('🏗️ Inicializando InventarioService');
    this.initializeItems();
  }

  private initializeItems() {
    const user = this.authService.getCurrentUser();
    
    if (user?.uid) {
      console.log('✅ Usuario encontrado en servicio:', user.email);
      this.items$ = this.getItemsForUser(user.uid);
    } else {
      console.log('⏳ No hay usuario aún, esperando...');
      this.items$ = of([]);
      
      // Escuchar cambios de usuario
      this.authService.user$.subscribe(newUser => {
        if (newUser?.uid) {
          console.log('🔄 Usuario detectado, actualizando items$');
          this.items$ = this.getItemsForUser(newUser.uid);
        }
      });
    }
  }

  private getItemsForUser(userId: string): Observable<InventarioItem[]> {
    console.log('📡 Creando query para userId:', userId);
    const itemsCollection = collection(this.firestore, this.collectionName);
    const q = query(
      itemsCollection, 
      where('usuarioId', '==', userId),
      orderBy('fechaRegistro', 'desc')
    );
    
    return collectionData(q, { idField: 'id' }) as Observable<InventarioItem[]>;
  }

  async addItem(item: Omit<InventarioItem, 'id' | 'usuarioId' | 'fechaRegistro'>) {
    const user = this.authService.getCurrentUser();
    
    if (!user || !user.uid) {
      console.error('❌ No hay usuario autenticado');
      alert('Debes iniciar sesión para agregar artículos');
      return { success: false, error: 'No autenticado' };
    }

    const itemsCollection = collection(this.firestore, this.collectionName);
    const newItem: any = {
      ...item,
      usuarioId: user.uid,
      fechaRegistro: new Date()
    };

    try {
      console.log('➕ Agregando item a Firestore:', newItem);
      const docRef = await addDoc(itemsCollection, newItem);
      console.log('✅ Item agregado con ID:', docRef.id);
      
      // Refrescar items$
      this.items$ = this.getItemsForUser(user.uid);
      
      return { success: true, id: docRef.id };
    } catch (error: any) {
      console.error('❌ Error al agregar item:', error);
      return { success: false, error: error.message };
    }
  }

  async updateItem(id: string, item: Partial<InventarioItem>) {
    const user = this.authService.getCurrentUser();
    
    try {
      const itemDoc = doc(this.firestore, this.collectionName, id);
      await updateDoc(itemDoc, { ...item });
      console.log('✅ Item actualizado:', id);
      
      // Refrescar items$ si hay usuario
      if (user?.uid) {
        this.items$ = this.getItemsForUser(user.uid);
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('❌ Error al actualizar item:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteItem(id: string) {
    const user = this.authService.getCurrentUser();
    
    try {
      const itemDoc = doc(this.firestore, this.collectionName, id);
      await deleteDoc(itemDoc);
      console.log('✅ Item eliminado:', id);
      
      // Refrescar items$ si hay usuario
      if (user?.uid) {
        this.items$ = this.getItemsForUser(user.uid);
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('❌ Error al eliminar item:', error);
      return { success: false, error: error.message };
    }
  }
}