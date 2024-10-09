import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formregister',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formregister.component.html',
  styleUrls: ['./formregister.component.css']
})
export class FormregisterComponent {
  containerForm: FormGroup;

  @Output() cancel = new EventEmitter<void>();
  constructor(private fb: FormBuilder) {
    // Khởi tạo form
    this.containerForm = this.fb.group({
      containerNumber: [''],
      iso: [''],
      owner: [''],
      size: [''],
      containerType: [''],
      manufacturerDate: [''],
      maxWeight: [''],
      tareWeight: [''],
      containerStatus: [''],
      customerName: [''],
      taxCode: [''],
      lineOperator: [''],
      licensePlate: [''],
      movement: [''],
      deadline: ['']
    });
  }

  cancelForm() {
    this.cancel.emit(); // Gọi sự kiện cancel khi nhấn nút
  }
  onSubmit() {
    // Tạm thời không làm gì
    console.log('Form submitted, but no action is performed yet.'); // Có thể thêm log để kiểm tra
  }
  showDeadline = false;
  onEirTypeChange(event: any) {
    const eirType = event.target.value;

    if (eirType == "Export") {
      this.showDeadline = true; // Hiển thị deadline
    } else if (eirType == "Import") {
      this.showDeadline = false; // Ẩn deadline
    }
  }

}