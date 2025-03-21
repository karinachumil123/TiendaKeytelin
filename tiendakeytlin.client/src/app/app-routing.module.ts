import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
<<<<<<< HEAD
import { ContactoComponent } from './Menu/Administracion/contacto/contacto.component';
import { AuthGuard } from './guards/auth.guard';
=======
import { SidebarComponent } from './components/sidebar/sidebar.component';
>>>>>>> e610747 (Login completo)

const routes: Routes = [
  { path: '', component: LoginComponent },
<<<<<<< HEAD
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contacto', component: ContactoComponent }
];  
=======
  {
    path: 'home', component: SidebarComponent,
    children: [
      { path: '', component: DashboardComponent },
      // Otras rutas aquí
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
>>>>>>> e610747 (Login completo)
