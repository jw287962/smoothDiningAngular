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
}
