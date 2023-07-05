import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isRegister: Boolean = false;

  toggleRegister() {
    this.isRegister = !this.isRegister;
    console.log(this.isRegister);
  }

  async handleLogin(e: Event) {
    e.preventDefault();
    console.log('handle', e);
    const result = await fetch(
      'https://smoothdining.azurewebsites.net/api/login'
    );

    console.log(result);
  }
}
