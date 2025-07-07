import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { MATERIAL_STANDALONE } from '../../../../shared/material/material.standalone';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_STANDALONE,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => this.users = res,
      error: () => {
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  onDelete(id: string): void {
    if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.snackBar.open('Usuario eliminado', 'Cerrar', { duration: 3000 });
        this.loadUsers();
      },
      error: () => {
        this.snackBar.open('Error al eliminar usuario', 'Cerrar', { duration: 3000 });
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(['/admin/users/create']);
  }
}
