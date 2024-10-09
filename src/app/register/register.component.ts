import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormregisterComponent } from '../formregister/formregister.component';
import { ShowinfoComponent } from '../showinfo/showinfo.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, SidebarComponent, FormregisterComponent, ShowinfoComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isAscending = true;
  currentPage = 1;
  itemsPerPage = 5;
  sortField: string = '';
  isPopupVisible: boolean = false;
  isShow: boolean = false;
  selectedItem: number | null = 1; // Mặc định là 'All'

  //data mẫu xóa sau khi có api
  dataSample = [
    { eirNumber: 'EIR001', customerName: 'Company A', taxCode: '12345', containerNumber: 'ABCD1234567', vehicle: 'Truck A', licensePlate: '29A-12345', deadline: '2024-09-30', type: 'Import', selected: false },
    { eirNumber: 'EIR002', customerName: 'Company B', taxCode: '67890', containerNumber: 'EFGH2345678', vehicle: 'Truck B', licensePlate: '30B-67890', deadline: '2024-10-01', type: 'Import', selected: false },
    { eirNumber: 'EIR003', customerName: 'Company C', taxCode: '54321', containerNumber: 'IJKL3456789', vehicle: 'Truck C', licensePlate: '79C-11111', deadline: '2024-10-05', type: 'Import', selected: false },
    { eirNumber: 'EIR004', customerName: 'Company D', taxCode: '98765', containerNumber: 'MNOP4567890', vehicle: 'Truck D', licensePlate: '65D-54321', deadline: '2024-10-10', type: 'Export', selected: false },
    { eirNumber: 'EIR005', customerName: 'Company E', taxCode: '11223', containerNumber: 'QRST5678901', vehicle: 'Truck E', licensePlate: '51E-99999', deadline: '2024-11-01', type: 'Import', selected: false },
    { eirNumber: 'EIR006', customerName: 'Company F', taxCode: '44556', containerNumber: 'UVWX6789012', vehicle: 'Truck F', licensePlate: '35F-88888', deadline: '2024-11-05', type: 'Export', selected: false },
    { eirNumber: 'EIR007', customerName: 'Company G', taxCode: '77889', containerNumber: 'YZAB7890123', vehicle: 'Truck G', licensePlate: '40G-77777', deadline: '2024-12-01', type: 'Import', selected: false }
  ];
  items = [
    { value: 1, label: 'All' },
    { value: 2, label: 'Import' },
    { value: 3, label: 'Export' },
  ];

  filteredData = [...this.dataSample];

  // Phương thức lọc dựa trên selectedItem
  filterData() {
    if (this.selectedItem == 1) {
      this.filteredData = [...this.dataSample]; // Hiển thị tất cả
    } else if (this.selectedItem == 2) {
      this.filteredData = this.dataSample.filter(data => data.type === 'Import'); // Lọc Import
    } else if (this.selectedItem == 3) {
      this.filteredData = this.dataSample.filter(data => data.type === 'Export'); // Lọc Export
    }
    // Reset lại trang về 1 sau khi lọc
    this.currentPage = 1;
  }

  //tính cắt từ thằng nào tới thằng nào cho trang đó
  get paginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredData.slice(start, end);
  }

  //lấy tổng trang = tổng item chia max item mỗi trang
  get totalPages() {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
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
    this.sortField = 'date';
    this.filteredData.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return this.isAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    this.currentPage = 1;
  }

  //gọi formfield
  isFormVisible = false;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  onCancel() {
    this.isFormVisible = false; // Ẩn form khi cancel
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

  showInfo() {
    // this.selectedEir = this.eirList.find(eir => eir.eirNumber === eirId);
    // this.selectedContainer = this.containerList.find(container => container.containerNumber === containerNumber);
    this.isShow = !this.isShow;
  }

  // Hàm xóa các item đã chọn
  deleteSelectedItems() {
  }
}
