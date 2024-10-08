import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.css'
})
export class VehicleComponent {
  isDropdownOpen = false;
  isAscending = true;
  currentPage = 1;
  itemsPerPage = 5;
  sortField: string = '';
  //data mẫu xóa sau khi có api
  dataSample = [
    { licensePlate: 'ABC123', vehicleCapacity: 20, driverName: 'John Doe', driverContact: '123-456-7890', companyName: 'Company A', status: 'Active', selected: false },
    { licensePlate: 'XYZ456', vehicleCapacity: 30, driverName: 'Jane Smith', driverContact: '987-654-3210', companyName: 'Company B', status: 'Inactive', selected: false },
    { licensePlate: 'LMN789', vehicleCapacity: 25, driverName: 'Alice Johnson', driverContact: '555-123-4567', companyName: 'Company C', status: 'Active', selected: false },
    { licensePlate: 'PQR101', vehicleCapacity: 40, driverName: 'Bob Lee', driverContact: '555-765-4321', companyName: 'Company D', status: 'Inactive', selected: false },
    { licensePlate: 'STU234', vehicleCapacity: 50, driverName: 'Charlie Brown', driverContact: '555-111-2222', companyName: 'Company E', status: 'Active', selected: false },
    { licensePlate: 'VWX567', vehicleCapacity: 15, driverName: 'Diana Prince', driverContact: '555-333-4444', companyName: 'Company F', status: 'Active', selected: false },
    { licensePlate: 'YZA890', vehicleCapacity: 10, driverName: 'Bruce Wayne', driverContact: '555-999-8888', companyName: 'Company G', status: 'Inactive', selected: false }
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  allSelected: boolean = false;
  // Toggle Select All checkboxes
  toggleSelectAll(event: any) {
    this.allSelected = event.target.checked;
    this.paginated.forEach(item => item.selected = this.allSelected);
  }

  // Toggle individual checkbox
  toggleCheckbox(data: any) {
    data.selected = !data.selected;
    this.allSelected = this.paginated.every(item => item.selected);
  }
  //pop up xóa
  isPopupVisible: boolean = false;

  // Mở popup khi bấm nút "Delete All Selected"
  openDeleteConfirmation() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  // Xác nhận xóa
  confirmDelete() {
    this.isPopupVisible = false;
    // Thực hiện logic xóa tại đây
    this.deleteSelectedItems();
  }

  // Hủy xóa và đóng popup
  cancelDelete() {
    this.isPopupVisible = false;
  }

  // Hàm xóa các item đã chọn
  deleteSelectedItems() {
  }
}

