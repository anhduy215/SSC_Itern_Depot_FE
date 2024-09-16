import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-inout',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './inout.component.html',
  styleUrl: './inout.component.css'
})
export class InoutComponent {

}
