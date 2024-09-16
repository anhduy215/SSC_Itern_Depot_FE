import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    // Xử lý đăng nhập ở đây API
    this.router.navigate(['/dashboard']);
  }
}