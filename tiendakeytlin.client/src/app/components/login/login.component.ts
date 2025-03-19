import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loading = false;
  returnUrl: string = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Redirigir si ya está logueado
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && expiration && new Date(expiration) > new Date()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // Obtener URL de retorno de los parámetros de consulta o usar '/' por defecto
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(): void {
    this.errorMessage = '';
    this.loading = true;

    // Validar campos
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, completa todos los campos';
      this.loading = false;
      return;
    }

    // Llamar al servicio de autenticación
    this.authService.login({
      username: this.email,
      password: this.password
    })
      .pipe(first())
      .subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(["/dashboard"]);
        },
        error: error => {
          this.errorMessage = error?.message || 'Usuario o contraseña incorrectos';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
