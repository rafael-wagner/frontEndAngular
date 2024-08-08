import { Component } from '@angular/core';
import { NavMenuComponent } from "../nav-menu.component";
import { NavMenuItemComponent } from "../nav-menu-item/nav-menu-item.component";
import { RouterOutlet } from '@angular/router';
import { IUser } from '../../../interfaces/IUser.interface';
import { IPerson } from '../../../interfaces/IPerson.interface';

@Component({
  selector: 'app-nav-registration',
  standalone: true,
  imports: [NavMenuComponent, NavMenuItemComponent,RouterOutlet],
  templateUrl: './nav-registration.component.html',
  styleUrl: './nav-registration.component.scss'
})
export class NavRegistrationComponent {



}
