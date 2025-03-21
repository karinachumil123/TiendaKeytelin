import { Component, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true // Marca el componente como standalone
})
export class DashboardComponent { }

<<<<<<< HEAD
  isDropdownOpen = {
    caja: false,
    productos: false,
    inventario: false,
    ventas: false,
    administracion: false
  };

  toggleDropdown(menu: string): void {
    // Cerrar todos los desplegables
    Object.keys(this.isDropdownOpen).forEach(key => {
      if (key !== menu) {
        this.isDropdownOpen[key as keyof typeof this.isDropdownOpen] = false;
      }
    });

    // Alternar el estado del menú seleccionado
    this.isDropdownOpen[menu as keyof typeof this.isDropdownOpen] = !this.isDropdownOpen[menu as keyof typeof this.isDropdownOpen];
  }

}
=======
>>>>>>> e610747 (Login completo)
