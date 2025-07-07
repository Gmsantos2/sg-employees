import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleService } from '../../service/role.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MATERIAL_STANDALONE } from '../../../../shared/material/material.standalone';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [
     CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ...MATERIAL_STANDALONE,
  ],
  templateUrl: './role-create.component.html',
  styleUrl: './role-create.component.css'
})
export class RoleCreateComponent {
   roleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.roleForm.invalid) return;

    this.roleService.createRole(this.roleForm.value).subscribe({
      next: () => {
        this.snackBar.open('Rol creado correctamente', 'Cerrar', {
          duration: 3000,
        });
        this.roleForm.reset();
      },
      error: () => {
        this.snackBar.open('Error al crear rol', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
