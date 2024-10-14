import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  isAscending = true;
  currentPage = 1;
  itemsPerPage = 6;
  //data mẫu xóa sau khi có api
  data: any[] = []; // Tất cả container
  filteredDataSample: any[] = []; // Danh sách container đã lọc theo điều kiện

  constructor(private apiService: ApiService) { } // Inject ApiService vào constructor

  ngOnInit() {
    this.loadContainers(); // Gọi phương thức để tải dữ liệu khi component khởi tạo
  }

  // Phương thức tải dữ liệu từ API
  loadContainers() {
    this.apiService.getContainers().then(data => {
      this.data = data; // Cập nhật biến dataSample với dữ liệu từ API
      this.filterContainers();
    }).catch(error => {
      console.error('Error loading containers:', error); // Xử lý lỗi nếu có
    });
  }

  // Lọc dữ liệu chỉ lấy những container có locationStatus === 'InBlock'
  filterContainers() {
    this.filteredDataSample = this.data.filter(container => container.locationStatus == 'InBlock');
    this.paginated; // Gọi phân trang sau khi lọc
  }

  //tính cắt từ start nào tới end cho trang đó
  get paginated() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredDataSample.slice(start, end);
  }

  //lấy tổng trang = tổng item chia max item mỗi trang
  get totalPages() {
    return Math.ceil(this.filteredDataSample.length / this.itemsPerPage);
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
    this.filteredDataSample.sort((a, b) => {
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
