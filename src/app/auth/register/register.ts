import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onRegister() {
    // Validaciones
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Por favor completa todos los campos';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const result = await this.authService.register(this.email, this.password);

    this.loading = false;

    if (result.success) {
      this.router.navigate(['/inventario']);
    } else {
      if (result.error.includes('email-already-in-use')) {
        this.errorMessage = 'Este email ya está registrado';
      } else if (result.error.includes('invalid-email')) {
        this.errorMessage = 'Email inválido';
      } else {
        this.errorMessage = 'Error al registrar. Intenta de nuevo';
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}