import { Component } from '@angular/core';
import { UserFormComponent } from "../user-form/user-form.component";
import { PersonFormComponent } from "../person-form/person-form.component";

@Component({
  selector: 'app-new-user-form',
  standalone: true,
  imports: [UserFormComponent, PersonFormComponent],
  templateUrl: './new-user-form.component.html',
  styleUrl: './new-user-form.component.scss'
})
export class NewUserFormComponent {

}
