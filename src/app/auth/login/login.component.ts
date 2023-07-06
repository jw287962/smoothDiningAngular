import { Component, Input, NgModule, resolveForwardRef } from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { getBackEndHref } from 'base-href';
import { CookieService } from 'ngx-cookie-service';
interface AuthGroup extends FormGroup {
  controls: {
    username: FormControl;
    password: FormControl;
    repeatPassword: FormControl;
  };
}
const confirmPasswordValidator: ValidationErrors = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = (control.parent as any)?.controls?.password.value;
  const confirmPassword = control.value;
  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordsNotMatch: true };
  }

  return null;
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isRegister: Boolean = false;
  FormAuth: FormGroup;
  message: string = '';
  toggleRegister() {
    this.isRegister = !this.isRegister;
    console.log(this.isRegister);
  }
  constructor(
    private cookieService: CookieService,
    private formBuilder: FormBuilder
  ) {
    this.FormAuth = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          confirmPasswordValidator,
        ],
      ],
    }) as AuthGroup;
  }
  get username() {
    return this.FormAuth?.get('username');
  }
  get password() {
    return this.FormAuth?.get('password');
  }
  get repeatPassword() {
    return this.FormAuth?.get('repeatPassword');
  }

  ngOnInit(): void {
    // Perform initialization tasks here
  }
  handleChange() {}
  handleSubmit(e: Event) {
    e.preventDefault();
    console.log(this.FormAuth.errors);
    if (this.FormAuth.errors) {
      return;
    }

    if (this.isRegister === false) {
      this.handleLogin('login');
    } else {
      this.handleLogin('register');
    }
  }

  async handleLogin(string: string) {
    let body;
    try {
      if (string === 'login') {
        body = JSON.stringify({
          username: this.FormAuth.get('username')?.value,
          password: this.FormAuth.get('password')?.value,
        });
      } else if (string === 'register') {
        body = JSON.stringify({
          username: this.FormAuth.get('username')?.value,
          password: this.FormAuth.get('password')?.value,
          repeatpassword: this.FormAuth.get('repeatPassword')?.value,
        });
      }
      const result = await fetch(`${getBackEndHref()}/api/${string}`, {
        credentials: 'include',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
      const responseBody = await result.json();
      this.message = responseBody.message;

      if (!result.ok) {
        console.log(result);
        console.log(responseBody);
        throw new Error(responseBody.message);
      } else {
        if (string === 'login')
          this.cookieService.set('user', responseBody.userID);
      }
    } catch (e) {
      console.log({ error: e });
    }
  }
}
