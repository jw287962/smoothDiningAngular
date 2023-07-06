import { Component, Input, resolveForwardRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
interface AuthGroup extends FormGroup {
  controls: {
    username: FormControl;
    password: FormControl;
  };
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isRegister: Boolean = false;
  // @Input('formControl')
  // isValid: Boolean = false;
  responseMessage: string = '';
  FormAuth: FormGroup;

  toggleRegister() {
    this.isRegister = !this.isRegister;
    console.log(this.isRegister);
  }
  constructor(private cookieService: CookieService) {
    this.FormAuth = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    }) as AuthGroup;
  }
  get username() {
    return this.FormAuth?.get('username');
  }
  ngOnInit(): void {
    // Perform initialization tasks here
  }
  handleChange() {
    // if (this.username?.value) {
    // }
  }
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
      const result = await fetch(
        `https://smoothdining.azurewebsites.net/api/${string}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.FormAuth.get('username')?.value,
            password: this.FormAuth.get('password')?.value,
          }),
        }
      );
      const sid = result.headers.get('set-cookie');
      if (sid) {
        this.cookieService.set('sid', sid);
      }

      // const sid = result.headers.get('sid');
      // if (sid) {
      //   localStorage.setItem('sid', sid);
      // }

      // document.cookie = cookieHeader;
      const responseBody = await result.json();
      if (!result.ok) {
        console.log(result);
        console.log(responseBody);
        throw new Error(responseBody.message);
      } else {
        console.log(responseBody);
      }
    } catch (e) {
      console.log({ error: e });
    }
  }
}
