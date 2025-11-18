import { TestBed } from '@angular/core/testing';
import { InventarioService } from '../services/inventario.services';

describe('Inventario', () => {
  let service: InventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
