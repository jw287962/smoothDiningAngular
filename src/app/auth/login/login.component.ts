import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectLoadingBoolean,
  selectLoginBoolean,
} from 'src/store/reducers/auth.reducer';
import { LoginApiService } from 'src/store/service/login.service';
import { handleResponseBody } from 'src/store/service/types';
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
  login$: Observable<boolean> = this._store.select(selectLoginBoolean);
  isRegister: boolean = false;
  FormAuth: FormGroup;
  message: string = '';
  loading$: Observable<boolean> = this._store.select(selectLoadingBoolean);
  toggleRegister() {
    this.isRegister = !this.isRegister;
    console.log(this.isRegister);
  }
  constructor(
    private formBuilder: FormBuilder,
    private apiService: LoginApiService,
    private _store: Store
  ) {
    this.FormAuth = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false],
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
  get rememberMe() {
    return this.FormAuth?.get('rememberMe');
  }
  ngOnInit(): void {
    // Perform initialization tasks here
  }
  handleChange() {}
  handleSubmit(e: Event) {
    e.preventDefault();
    if (this.FormAuth.errors) {
      return;
    }

    this.handleLogin(this.isRegister);
  }

  async handleLogin(isLogin: boolean) {
    try {
      if (this.rememberMe) {
        console.log('remeber me');
      }

      const result = await this.apiService.tryLogin(
        !isLogin,
        this.username?.value,
        this.password?.value,
        this.repeatPassword?.value
      );
      this.message = handleResponseBody(result);
    } catch (e) {
      console.log({ error: e });
    }
  }
  async handleLogout() {
    try {
      const result = await this.apiService.logout();
      this.message = handleResponseBody(result);
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

  processTestAccount() {
    this.FormAuth?.setValue({
      username: 'admin',
      password: 'password@',
      rememberMe: false,
      repeatPassword: '',
    });

    this.handleLogin(false);
  }
}
