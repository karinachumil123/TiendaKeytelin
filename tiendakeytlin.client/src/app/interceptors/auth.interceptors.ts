import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtener el token de autenticación
    const token = this.authService.getToken();

    if (token) {
      // Clonamos la solicitud y añadimos el token en el header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continuamos con la solicitud modificada
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Si el error es 401 (No autorizado), cerramos sesión y redirigimos al login
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        // Si el error es otro, lo pasamos al flujo de errores para manejarlo adecuadamente
        return throwError(() => error);
      })
    );
  }
}
