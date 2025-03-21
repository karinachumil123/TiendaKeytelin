import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
<<<<<<< HEAD
import { ContactoComponent } from './Menu/Administracion/contacto/contacto.component';
import { ContactoModalComponent } from './Menu/Administracion/contacto/contacto-modal/contacto-modal.component';
=======
import { JwtInterceptor } from './interceptors/jwt.interceptors';
import { JwtModule } from '@auth0/angular-jwt';
>>>>>>> e610747 (Login completo)

export function tokenGetter() {
  return localStorage.getItem('token');
}

<<<<<<< HEAD
// Definir rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // Ejemplo de una ruta protegida
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

=======
>>>>>>> e610747 (Login completo)
@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    DashboardComponent,
    ContactoComponent,
    ContactoModalComponent,
    // No es necesario declarar LoginComponent aquí
=======
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    LoginComponent, // Importa LoginComponent como standalone
    DashboardComponent, // Importa DashboardComponent como standalone
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5010'],
        disallowedRoutes: ['http://localhost:5010/api/auth/login']
      }
    })
>>>>>>> e610747 (Login completo)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
