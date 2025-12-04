import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { InventarioItem } from '../models/inventario.model';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  deleteItem(id: string) {
    throw new Error('Method not implemented.');
  }
  addItem(formData: { nombre: string; categoria: string; cantidad: number; descripcion: string; estado: "disponible" | "en-uso" | "dañado" | "perdido"; ubicacion: string; }) {
    throw new Error('Method not implemented.');
  }
  updateItem(id: string, formData: { nombre: string; categoria: string; cantidad: number; descripcion: string; estado: "disponible" | "en-uso" | "dañado" | "perdido"; ubicacion: string; }) {
    throw new Error('Method not implemented.');
  }
  items$: any;
  
}