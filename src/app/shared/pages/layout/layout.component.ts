import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { jwtDecode } from 'jwt-decode';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MATERIAL_STANDALONE } from '../../material/material.standalone';


interface MenuItem {
  path: string;
  label: string;
  icon: string;
  roles: string[];
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ...MATERIAL_STANDALONE,
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  role: string = '';
  activeRoute: string = '';
  menuItems: MenuItem[] = [];
  isMobile = false;

  constructor(
    public router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
     this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });

    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      this.role = decoded.authority;
      this.menuItems = this.getMenuItems();
    }

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeRoute = event.urlAfterRedirects;
      });
  }

   ifMobileClose(drawer: any) {
    if (this.isMobile) drawer.close();
  }

  getMenuItems(): MenuItem[] {
    const items: MenuItem[] = [
      {
        path: '/profile',
        label: 'Perfil',
        icon: 'person',
        roles: [],
      },
      {
        path: '/schedule',
        label: 'Horario',
        icon: 'schedule',
        roles: [],
      },
      {
        path: '/history',
        label: 'Historial de horarios',
        icon: 'history',
        roles: [],
      },
      {
        path: '/admin/users/create',
        label: 'Crear usuario',
        icon: 'person_add',
        roles: ['ADMIN'],
      },
      {
        path: '/admin/users/list',
        label: 'Lista de usuarios',
        icon: 'people',
        roles: ['ADMIN'],
      },
      {
        path: '/admin/roles/create',
        label: 'Crear rol',
        icon: 'group_add',
        roles: ['ADMIN'],
      },
      {
        path: '/admin/roles/list',
        label: 'Lista de roles',
        icon: 'groups',
        roles: ['ADMIN'],
      },
    ];

    return items.filter(
      (item) => item.roles.length === 0 || item.roles.includes(this.role)
    );
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
