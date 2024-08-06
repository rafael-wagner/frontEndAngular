import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginCardComponent } from "./components/login-card/login-card.component";
import { UserFormComponent } from "./components/user-form/user-form.component";
import { AddressFormComponent } from "./components/address-form/address-form.component";
import { PersonFormComponent } from "./components/person-form/person-form.component";
import { NavMenuItemComponent } from "./components/nav-menu/nav-menu-item/nav-menu-item.component";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginCardComponent, UserFormComponent, AddressFormComponent, PersonFormComponent, NavMenuItemComponent, NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontZe';
}
