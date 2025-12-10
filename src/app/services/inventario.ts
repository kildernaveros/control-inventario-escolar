import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc, query, where, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InventarioItem } from '../models/inventario.model';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private collectionName = 'inventario';
  private firestore: Firestore;

  constructor(
    private authService: AuthService,  
  ){
    this.firestore = inject(Firestore);
  }

  // Obtener todos los items del usuario actual
getItems(): Observable<InventarioItem[]> {
  const userId = this.authService.getCurrentUser()?.uid;
  console.log('🔍 Obteniendo items para usuario:', userId);
  
  if (!userId) {
    console.error('❌ No hay userId');
    return new Observable(observer => observer.next([]));
  }

  const itemsCollection = collection(this.firestore, this.collectionName);
  const q = query(
    itemsCollection, 
    where('usuarioId', '==', userId)
  );
  
  const items$ = collectionData(q, { idField: 'id' }) as Observable<InventarioItem[]>;
  
  items$.subscribe(items => {
    console.log('📦 Items recibidos:', items.length, items);
  });
  
  return items$;
}
  // Crear nuevo item
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
    const docRef = await addDoc(itemsCollection, newItem);
    console.log('✅ Item agregado:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('❌ Error al agregar item:', error);
    return { success: false, error: error.message };
  }
}
  // Actualizar item
  async updateItem(id: string, item: Partial<InventarioItem>) {
    try {
      const itemDoc = doc(this.firestore, this.collectionName, id);
      await updateDoc(itemDoc, { ...item });
      console.log('✅ Item actualizado:', id);
      return { success: true };
    } catch (error: any) {
      console.error('❌ Error al actualizar item:', error);
      return { success: false, error: error.message };
    }
  }

  // Eliminar item
  async deleteItem(id: string) {
    try {
      const itemDoc = doc(this.firestore, this.collectionName, id);
      await deleteDoc(itemDoc);
      console.log('✅ Item eliminado:', id);
      return { success: true };
    } catch (error: any) {
      console.error('❌ Error al eliminar item:', error);
      return { success: false, error: error.message };
    }
  }
}