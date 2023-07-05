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

  async handleLogin(e: Event) {
    e.preventDefault();
    console.log('handle', e);
    const result = await fetch(
      'https://smoothdining.azurewebsites.net/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.username.value,
          password: this.password.value,
        }),
      }
    );

    console.log(result, 'form', this.username.value);
  }
}
