import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { TestFirebaseComponent } from './test-firebase/test-firebase.component';
import { InventarioComponent } from './inventario/inventario';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inventario', component: InventarioComponent },
  { path: 'test', component: TestFirebaseComponent },
  { path: '**', redirectTo: '/login' }
];