import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../service/profile.service';
import { Profile } from '../../interfaces/profile.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MATERIAL_STANDALONE } from '../../../../shared/material/material.standalone';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
  CommonModule,
  ReactiveFormsModule,
  ...MATERIAL_STANDALONE,
],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profileData!: Profile;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profileData = data;
        this.profileForm.patchValue(data);
      },
      error: () => {
        this.snackBar.open('Error al cargar perfil', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: () => {
        this.snackBar.open('Perfil actualizado con éxito', 'Cerrar', {
          duration: 3000,
        });
      },
      error: () => {
        this.snackBar.open('Error al actualizar perfil', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
