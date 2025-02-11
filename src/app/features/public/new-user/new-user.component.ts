import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, style, transition, trigger } from '@angular/animations';

import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { UserService } from '../shared/services/user/user.service';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss'],
  animations: [
    trigger('enter', [
      transition(':enter', [
        style({ opacity: 0.5 }),
        animate('400ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class NewUserComponent {
  profileForm = this.fb.group({
    telefone: [''],
    login: ['', [Validators.email]],
    nome: ['', this.checkName],
    senha: [''],
    confirmarSenha: [''],
  });

  type = 'password';

  isOpen = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder
  ) {}

  checkName(input: FormControl) {
    const hasNumber = /[0-9]/.test(input.value);

    if (hasNumber) return { hasNumber: true };
    else {
      const name = input.value.split(' ');

      const filtrado = name.filter((x: string) => {
        if (x != '' && x.length > 1) return { isNameComplete: true };

        return null;
      });

      return filtrado.length < 2 ? { isNameComplete: true } : null;
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.userService.postUser(this.profileForm.value).subscribe(
        (response) => {
          this.snackbarService.openSnackBar(
            `Parabéns! usuário ${this.profileForm.value.nome} cadastrado com sucesso, faça login`,
            'X',
            false
          );
          this.router.navigate(['/login']);
        },
        (error) => {
          this.snackbarService.openSnackBar(
            `Tente novamente ( ${error.error}) `,
            'X',
            true
          );
          console.log(error);
        }
      );
    }
  }

  confirmPassword() {
    if (
      this.profileForm.value.senha !== this.profileForm.value.confirmarSenha &&
      this.profileForm.value.senha.length >= 6 &&
      this.profileForm.value.confirmarSenha.length >= 6
    ) {
      this.profileForm.controls.confirmarSenha.setErrors({
        passwordNotEqual: true,
      });
    }
  }
}
