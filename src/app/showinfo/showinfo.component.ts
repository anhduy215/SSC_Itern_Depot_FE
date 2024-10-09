import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './showinfo.component.html',
  styleUrl: './showinfo.component.css'
})
export class ShowinfoComponent {}