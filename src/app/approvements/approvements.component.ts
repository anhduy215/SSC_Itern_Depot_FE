import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShowinfoComponent } from '../showinfo/showinfo.component';
@Component({
  selector: 'app-approvement',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, SidebarComponent, ShowinfoComponent],
  templateUrl: './approvements.component.html',
  styleUrls: ['./approvements.component.css']
})
export class ApprovementsComponent {
  showManagement = false;

  onSearch() {
    this.showManagement = true;
  }
}