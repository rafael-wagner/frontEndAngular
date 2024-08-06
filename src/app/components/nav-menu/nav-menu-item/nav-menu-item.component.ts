import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-nav-menu-item',
  standalone: true,
  imports: [ 
    RouterLink
    ,RouterOutlet
    ,RouterLinkActive],
  templateUrl: './nav-menu-item.component.html',
  styleUrl: './nav-menu-item.component.scss'
})
export class NavMenuItemComponent {
  @Input({required:true}) itemText: string = '';
  @Input({required: true}) routerLink : null | string = '';
  @Input() routerLinkActiveOptions: boolean = false;

}
