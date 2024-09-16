import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-voyage',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './voyage.component.html',
  styleUrl: './voyage.component.css'
})
export class VoyageComponent {

}
