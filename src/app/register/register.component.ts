import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormregisterComponent } from '../formregister/formregister.component';
import { ShowinfoComponent } from '../showinfo/showinfo.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';


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

  //call api get toàn bộ eir
  eirList: any[] = [];
  constructor(private apiService: ApiService) {}
  
  ngOnInit() {
    this.loadEirs(); // Lấy danh sách EIRs khi component khởi tạo
  }

  loadEirs() {
    this.apiService.getEirs()
      .then(data => {
        this.eirList = data; // Lưu dữ liệu vào eirList
        this.filteredData = [...this.eirList]; // Cập nhật filteredData
      })
      .catch(error => {
        console.error('Error loading EIRs:', error);
      });
  }

  items = [
    { value: 1, label: 'All' },
    { value: 2, label: 'Import' },
    { value: 3, label: 'Export' },
  ];

  filteredData = [...this.eirList];

  // Phương thức lọc dựa trên selectedItem
  filterData() {
    if (this.selectedItem == 1) {
      this.filteredData = [...this.eirList];
    } else if (this.selectedItem == 2) {
      this.filteredData = this.eirList.filter(data => data.eirType == 'Import');
    } else if (this.selectedItem == 3) {
      this.filteredData = this.eirList.filter(data => data.eirType == 'Export');
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
