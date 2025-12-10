import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InventarioService } from '../services/inventario';
import { AuthService } from '../services/auth';
import { InventarioItem } from '../models/inventario.model';


@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class InventarioComponent implements OnInit {
  items: InventarioItem[] = [];
  filteredItems: InventarioItem[] = [];
  searchTerm = '';
  selectedCategoria = '';
  selectedEstado = '';
  showForm = false;
  editingItem: InventarioItem | null = null;

  // Formulario
  formData = {
    nombre: '',
    categoria: '',
    cantidad: 0,
    descripcion: '',
    estado: 'disponible' as 'disponible' | 'en-uso' | 'dañado' | 'perdido',
    ubicacion: ''
  };

  categorias = ['Electrónica', 'Mobiliario', 'Material Didáctico', 'Deportes', 'Oficina', 'Otros'];
  estados = ['disponible', 'en-uso', 'dañado', 'perdido'];

  constructor(
    private inventarioService: InventarioService,
    private authService: AuthService,
    private router: Router
  ) {}

ngOnInit() {
  // Esperar a que el usuario se cargue antes de cargar items
  this.authService.user$.subscribe(user => {
    if (user) {
      console.log('✅ Usuario cargado en inventario:', user.email);
      this.loadItems();
    } else {
      console.log('⏳ Esperando usuario...');
    }
  });
}
  loadItems() {
    this.inventarioService.getItems().subscribe(items => {
      this.items = items;

      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      const matchSearch = item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                         item.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCategoria = !this.selectedCategoria || item.categoria === this.selectedCategoria;
      const matchEstado = !this.selectedEstado || item.estado === this.selectedEstado;
      
      return matchSearch && matchCategoria && matchEstado;
      });
  }

  onSearch() {
    this.applyFilters();
  }

  openForm(item?: InventarioItem) {
    if (item) {
      this.editingItem = item;
      this.formData = {
        nombre: item.nombre,
        categoria: item.categoria,
        cantidad: item.cantidad,
        descripcion: item.descripcion,
        estado: item.estado,
        ubicacion: item.ubicacion
      };
    } else {
      this.editingItem = null;
      this.resetForm();
    }
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.editingItem = null;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      nombre: '',
      categoria: '',
      cantidad: 0,
      descripcion: '',
      estado: 'disponible',
      ubicacion: ''
    };
  }

  async onSubmit() {
    console.log('📤 Enviando formulario:', this.authService.getCurrentUser()?.email);

    if (!this.formData.nombre || !this.formData.categoria) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    if (this.editingItem?.id) {
      await this.inventarioService.updateItem(this.editingItem.id, this.formData);
    } else {
      await this.inventarioService.addItem(this.formData);
    }

    this.closeForm();
  }

  async deleteItem(id: string) {
    if (confirm('¿Estás seguro de eliminar este artículo?')) {
      console.log('🗑️ Eliminando item:', id);
      await this.inventarioService.deleteItem(id);
    }
  }

 getStats() {
  return {
    total: this.items.length,
    disponibles: this.items.filter(i => i.estado === 'disponible').length,
    enUso: this.items.filter(i => i.estado === 'en-uso').length,
    danados: this.items.filter(i => i.estado === 'dañado').length,
    perdidos: this.items.filter(i => i.estado === 'perdido').length
  };
}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}