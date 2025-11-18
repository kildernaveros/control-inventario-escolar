export interface InventarioItem {
  id?: string;
  nombre: string;
  categoria: string;
  cantidad: number;
  descripcion: string;
  fechaRegistro: Date;
  estado: 'disponible' | 'en-uso' | 'dañado' | 'perdido';
  ubicacion: string;
  usuarioId: string;
}

export interface InventarioStats {
  totalArticulos: number;
  disponibles: number;
  enUso: number;
  dañados: number;
  perdidos: number;
  categorias: { [key: string]: number };
}