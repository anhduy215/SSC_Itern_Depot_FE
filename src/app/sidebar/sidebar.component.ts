import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) { }

  onLogout() {
    // Thực hiện các hành động khi người dùng đăng xuất, ví dụ như xóa token, làm sạch session...
    console.log('User logged out');

    // Chuyển hướng về trang đăng nhập
    this.router.navigate(['/login']);
  }

}