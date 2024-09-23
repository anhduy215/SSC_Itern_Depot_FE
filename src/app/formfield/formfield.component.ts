import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formfield.component.html',
  styleUrl: './formfield.component.css'
})
export class FormfieldComponent {
  containerForm: FormGroup;
  @Output() cancel = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    // Khởi tạo form
    this.containerForm = this.fb.group({
      fieldA: [''], // Khung A
      fieldB: ['']  // Khung B
    });
  }

  cancelForm() {
    this.cancel.emit(); // Gọi sự kiện cancel khi nhấn nút
  }
  onSubmit() {
    // Tạm thời không làm gì
    console.log('Form submitted, but no action is performed yet.'); // Có thể thêm log để kiểm tra
  }
}


