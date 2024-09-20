import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-command',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './command.component.html',
  styleUrl: './command.component.css'
})
export class CommandComponent {
  isAscending = true;
  currentPage = 1;
  itemsPerPage = 5;
  sortField: string = '';
  //data mẫu xóa sau khi có api
  commands = [
    { customerName: 'Company A', taxCode: '12345', lineOperator: 'Operator A', voyageNumber: 'VY123', containerQuantity: 5, deadline: '2024-09-30' },
    { customerName: 'Company B', taxCode: '67890', lineOperator: 'Operator B', voyageNumber: 'VY456', containerQuantity: 8, deadline: '2024-10-01' },
    { customerName: 'Company C', taxCode: '54321', lineOperator: 'Operator C', voyageNumber: 'VY789', containerQuantity: 10, deadline: '2024-10-05' },
    { customerName: 'Company D', taxCode: '98765', lineOperator: 'Operator D', voyageNumber: 'VY101', containerQuantity: 3, deadline: '2024-10-10' },
    { customerName: 'Company E', taxCode: '11223', lineOperator: 'Operator E', voyageNumber: 'VY234', containerQuantity: 12, deadline: '2024-11-01' },
    { customerName: 'Company F', taxCode: '44556', lineOperator: 'Operator F', voyageNumber: 'VY567', containerQuantity: 15, deadline: '2024-11-05' },
    { customerName: 'Company G', taxCode: '77889', lineOperator: 'Operator G', voyageNumber: 'VY890', containerQuantity: 7, deadline: '2024-12-01' }
  ];
  
  

  //tính cắt từ thằng nào tới thằng nào cho trang đó
  get paginatedCommands() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.commands.slice(start, end);
  }

  //lấy tổng trang = tổng item chia max item mỗi trang
  get totalPages() {
    return Math.ceil(this.commands.length / this.itemsPerPage);
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

  sortByQuantity() {
    this.isAscending = !this.isAscending; // Đảo ngược trạng thái sắp xếp
    this.sortField = 'quantity';
    this.commands.sort((a, b) => {
      return this.isAscending ? a.containerQuantity - b.containerQuantity : b.containerQuantity - a.containerQuantity;
    });
    this.currentPage = 1;
  }

  sortByDate() {
    this.isAscending = !this.isAscending; // Đảo ngược trạng thái sắp xếp
    this.sortField = 'date';
    this.commands.sort((a, b) => {
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return this.isAscending ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    this.currentPage = 1;
  }
}
