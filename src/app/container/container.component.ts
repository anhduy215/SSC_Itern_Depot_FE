import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormfieldComponent } from '../formfield/formfield.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, FormfieldComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  isAscending = true;
  currentPage = 1;
  itemsPerPage = 6;
  //data mẫu xóa sau khi có api
  dataSample = [
    { containerNumber: 'C123', isoCode: 'ABC123', owner: 'Company A', size: 20, type: 'Type A', maxWeight: 2000, tareWeight: 1500, dateManufacture: '2023-01-01', position: 'Block 1: B1, R1, T1', containerStatus: 'Available', status: 'inpot' },
    { containerNumber: 'C456', isoCode: 'XYZ456', owner: 'Company B', size: 30, type: 'Type B', maxWeight: 3000, tareWeight: 2500, dateManufacture: '2023-02-01', position: 'Block 2: B2, R2, T2', containerStatus: 'In Use', status: 'inpot' },
    { containerNumber: 'C789', isoCode: 'LMN789', owner: 'Company C', size: 40, type: 'Type C', maxWeight: 4000, tareWeight: 3500, dateManufacture: '2023-03-01', position: 'Block 3: B3, R3, T3', containerStatus: 'Under Maintenance', status: 'inpot' },
    { containerNumber: 'C101', isoCode: 'LMN101', owner: 'Company D', size: 50, type: 'Type D', maxWeight: 4500, tareWeight: 4000, dateManufacture: '2023-04-01', position: 'Block 4: B4, R4, T4', containerStatus: 'Available', status: 'inpot' },
    { containerNumber: 'C102', isoCode: 'LMN102', owner: 'Company E', size: 60, type: 'Type E', maxWeight: 5000, tareWeight: 4500, dateManufacture: '2023-05-01', position: 'Block 5: B5, R5, T5', containerStatus: 'In Use', status: 'inpot' },
    { containerNumber: 'C103', isoCode: 'LMN103', owner: 'Company F', size: 70, type: 'Type F', maxWeight: 5500, tareWeight: 5000, dateManufacture: '2023-06-01', position: 'Block 6: B6, R6, T6', containerStatus: 'Under Maintenance', status: 'inpot' },
    { containerNumber: 'C104', isoCode: 'LMN104', owner: 'Company G', size: 80, type: 'Type G', maxWeight: 6000, tareWeight: 5500, dateManufacture: '2023-07-01', position: 'Block 7: B7, R7, T7', containerStatus: 'Available', status: 'inpot' },
    { containerNumber: 'C105', isoCode: 'LMN105', owner: 'Company H', size: 100, type: 'Type H', maxWeight: 7000, tareWeight: 6500, dateManufacture: '2023-08-01', position: 'Block 8: B8, R8, T8', containerStatus: 'In Use', status: 'inpot' }
];

  

  //tính cắt từ start nào tới end cho trang đó
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

  // Hàm sắp xếp theo Size
  sortBySize() {
    this.isAscending = !this.isAscending; // Đảo ngược trạng thái sắp xếp
    this.dataSample.sort((a, b) => {
      return this.isAscending ? a.size - b.size : b.size - a.size;
    });
    this.currentPage = 1;
  }
  showModal(text: string) {
    const modalTextElement = document.getElementById('modal-text');
    if (modalTextElement) { // Kiểm tra xem phần tử có tồn tại hay không
        modalTextElement.innerText = text; // Cập nhật nội dung modal
    }
    const modalElement = document.getElementById('modal');
    if (modalElement) { // Kiểm tra xem phần tử có tồn tại hay không
        modalElement.style.display = "block"; // Hiển thị modal
    }
}

closeModal() {
    const modalElement = document.getElementById('modal');
    if (modalElement) { // Kiểm tra xem phần tử có tồn tại hay không
        modalElement.style.display = "none"; // Ẩn modal
    }
}


}
