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
  itemsPerPage = 5;
  //data mẫu xóa sau khi có api
  dataSample = [
    { isoCode: 'ABC123', owner: 'Company A', lineOperator: 'Operator A', size: 20, position: 'Block 1: B1, R1, T1', selected: false },
    { isoCode: 'XYZ456', owner: 'Company B', lineOperator: 'Operator B', size: 30, position: 'Block 2: B2, R2, T2', selected: false },
    { isoCode: 'LMN789', owner: 'Company C', lineOperator: 'Operator C', size: 40, position: 'Block 3: B3, R3, T3', selected: false },
    { isoCode: 'LMN789', owner: 'Company D', lineOperator: 'Operator C', size: 50, position: 'Block 3: B3, R3, T3', selected: false },
    { isoCode: 'LMN789', owner: 'Company E', lineOperator: 'Operator C', size: 60, position: 'Block 3: B3, R3, T3', selected: false },
    { isoCode: 'LMN789', owner: 'Company F', lineOperator: 'Operator C', size: 70, position: 'Block 3: B3, R3, T3', selected: false },
    { isoCode: 'LMN789', owner: 'Company G', lineOperator: 'Operator C', size: 80, position: 'Block 3: B3, R3, T3', selected: false },
    { isoCode: 'LMN789', owner: 'Company H', lineOperator: 'Operator C', size: 100, position: 'Block 3: B3, R3, T3', selected: false },
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
  //gọi formfield
  isFormVisible = false;

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
  onCancel() {
    this.isFormVisible = false; // Ẩn form khi cancel
  }

  // Toggle Select All checkboxes
  allSelected: boolean = false;
  
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
