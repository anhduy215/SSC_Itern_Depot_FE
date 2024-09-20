import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './inout.component.html',
  styleUrl: './inout.component.css'
})
export class InoutComponent {
  isAscending = true;
  currentPage = 1;
  itemsPerPage = 5;
  sortField: string = '';
  //data mẫu xóa sau khi có api
  dataSample = [
    { containerNumber: 'CN001', vehicle: 'Truck A', date: '2024-09-25', movementType: 'In' },
    { containerNumber: 'CN002', vehicle: 'Truck B', date: '2024-10-01', movementType: 'Out' },
    { containerNumber: 'CN003', vehicle: 'Truck C', date: '2024-10-10', movementType: 'In' },
    { containerNumber: 'CN004', vehicle: 'Truck D', date: '2024-11-01', movementType: 'Out' },
    { containerNumber: 'CN005', vehicle: 'Truck E', date: '2024-11-10', movementType: 'In' },
    { containerNumber: 'CN006', vehicle: 'Truck F', date: '2024-12-01', movementType: 'Out' },
    { containerNumber: 'CN007', vehicle: 'Truck G', date: '2024-12-15', movementType: 'In' }
  ];


  //tính cắt từ thằng nào tới thằng nào cho trang đó
  get paginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.dataSample.slice(start, end);
  }

  //lấy tổng trang = tổng item chia max item mỗi trang
  get totalPages() {
    return Math.ceil(this.dataSample.length / this.itemsPerPage);
  }

  //page nhỏ hơn page tối đa thì thêm 1 còn page tối đa thì k chuyển dc nữa
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // page lớn hơn 1 thì trừ còn page 1 thì k chuyển dc nữa
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  sortByDate() {
    this.isAscending = !this.isAscending; // Đảo ngược trạng thái sắp xếp
    this.sortField = 'departure';
    this.dataSample.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return this.isAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    this.currentPage = 1;
  }
}
