import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { LoginApiService } from 'src/store/service/login.service';
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
//
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
    private formBuilder: FormBuilder,
    private apiService: LoginApiService
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
    try {
      const result = await this.apiService.tryLogin(
        string,
        this.username?.value,
        this.password?.value,
        this.repeatPassword?.value
      );

      this.message = result;
    } catch (e) {
      console.log({ error: e });
    }
  }
  async handleLogout() {
    try {
      const result = await this.apiService.logout();
      this.message = result;
      console.log(result);
    } catch (e) {
      console.log({ error: e });
    }
  }

  processGoogleClick() {
    if (this.isRegister) {
      console.log('Sign Up....');
    } else {
      console.log('Sign In...');
    }
  }
}
