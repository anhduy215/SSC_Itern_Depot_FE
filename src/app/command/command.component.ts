import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-command',
  standalone: true,
  imports: [RouterOutlet,SidebarComponent],
  templateUrl: './command.component.html',
  styleUrl: './command.component.css'
})
export class CommandComponent {

}
