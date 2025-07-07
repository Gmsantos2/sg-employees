import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserCreate } from '../../interfaces/user-create.interface';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../roles/service/role.service';
import { MATERIAL_STANDALONE } from '../../../../shared/material/material.standalone';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_STANDALONE,
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent {
  userForm: FormGroup;
  file: File | null = null;

  roles: { _id: string; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.loadRoles();
  }

  loadRoles() {
  this.roleService.getRoles().subscribe({
    next: (res) => (this.roles = res.data), // ✅ Ahora sí reconoce `.data`
    error: (err) => {
      console.error('Error al cargar roles', err);
      this.snackBar.open('No se pudieron cargar los roles', 'Cerrar', {
        duration: 3000,
      });
    },
  });
}


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  onSubmit() {
    if (this.userForm.invalid || !this.file) {
      this.userForm.markAllAsTouched();
      this.snackBar.open('Completa todos los campos y selecciona una imagen', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const userData: UserCreate = {
      ...this.userForm.value,
      file: this.file, // 👈 archivo binario PNG
    };

    this.userService.createUser(userData).subscribe({
      next: () => {
        this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.userForm.reset();
        this.file = null;
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        this.snackBar.open('Error al crear usuario', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
