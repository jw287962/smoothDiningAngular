import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isRegister: Boolean = false;
  // @Input('formControl')
  username = new FormControl('');
  password = new FormControl('');
  toggleRegister() {
    this.isRegister = !this.isRegister;
    console.log(this.isRegister);
  }
  handleSubmit(e: Event) {
    e.preventDefault();
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
          body: JSON.stringify({
            username: this.username.value,
            password: this.password.value,
          }),
        }
      );
      console.log(result);
      if (!result.ok) {
        throw new Error('failed to login/register');
      }
    } catch (e) {
      console.log({ error: e });
    }
  }
}
