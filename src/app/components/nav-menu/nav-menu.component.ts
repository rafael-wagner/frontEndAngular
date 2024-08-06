import { Component } from '@angular/core';
import { NavMenuItemComponent } from "./nav-menu-item/nav-menu-item.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [NavMenuItemComponent,RouterOutlet],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {


}
