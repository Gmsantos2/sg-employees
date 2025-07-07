import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../service/role.service';
import { Role } from '../../interfaces/role.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MATERIAL_STANDALONE } from '../../../../shared/material/material.standalone';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_STANDALONE,
  ],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  displayedColumns: string[] = ['name', 'createdAt'];

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (res) => this.roles = res.data,
      error: () => {
        this.snackBar.open('Error al cargar roles', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
