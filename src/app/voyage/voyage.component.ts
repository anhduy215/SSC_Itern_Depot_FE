import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voyage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './voyage.component.html',
  styleUrl: './voyage.component.css'
})
export class VoyageComponent {
  isAscending = true;
  currentPage = 1;
  itemsPerPage = 5;
  sortField: string = '';
  //data mẫu xóa sau khi có api
  dataSample = [
    { voyageNumber: 'VY123', shipName: 'Evergreen', departureDate: '2024-09-25', arrivalDate: '2024-09-30' },
    { voyageNumber: 'VY456', shipName: 'Maersk', departureDate: '2024-10-01', arrivalDate: '2024-10-05' },
    { voyageNumber: 'VY789', shipName: 'CMA CGM', departureDate: '2024-10-10', arrivalDate: '2024-10-15' },
    { voyageNumber: 'VY101', shipName: 'Hapag-Lloyd', departureDate: '2024-11-01', arrivalDate: '2024-11-07' },
    { voyageNumber: 'VY234', shipName: 'MSC', departureDate: '2024-11-10', arrivalDate: '2024-11-14' },
    { voyageNumber: 'VY567', shipName: 'COSCO', departureDate: '2024-12-01', arrivalDate: '2024-12-06' },
    { voyageNumber: 'VY890', shipName: 'ONE', departureDate: '2024-12-15', arrivalDate: '2024-12-20' }
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

  sortByDeparture() {
    this.isAscending = !this.isAscending; // Đảo ngược trạng thái sắp xếp
    this.sortField = 'departure';
    this.dataSample.sort((a, b) => {
      const dateA = new Date(a.departureDate);
      const dateB = new Date(b.departureDate);
      return this.isAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    this.currentPage = 1;
  }
  sortByArrival() {
    this.isAscending = !this.isAscending; // Đảo ngược trạng thái sắp xếp
    this.sortField = 'arrival';
    this.dataSample.sort((a, b) => {
      const dateA = new Date(a.arrivalDate);
      const dateB = new Date(b.arrivalDate);
      return this.isAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    this.currentPage = 1;
  }
}