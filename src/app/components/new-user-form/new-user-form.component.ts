import { Component, inject, Input} from '@angular/core';
import { RequestService } from '../../services/request.service';
import { IUser } from '../../interfaces/IUser.interface';
import { UserFormComponent } from "../editForms/userEditForms/user-form/user-form.component";
import { PersonFormComponent } from '../editForms/userEditForms/person-form/person-form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, UserFormComponent, PersonFormComponent],
  templateUrl: './new-user-form.component.html',
  styleUrl: './new-user-form.component.scss'
})
export class NewUserFormComponent {

  newUserForm : FormGroup = new FormGroup({})

  private readonly _requestService = inject(RequestService)

  userFormOnSubmitEvent() {
    const newUser : IUser = {
      name: this.newUserForm.value.userForm.userName
      ,email: this.newUserForm.value.userForm.email
      ,password: this.newUserForm.value.userForm.password

      ,person: {
        name: this.newUserForm.value.personForm.personName
        ,phone: this.newUserForm.value.personForm.phone
        ,cpf: this.newUserForm.value.personForm.cpf
      }
    } 

    this._requestService.postNewUser(newUser)
      .subscribe()

  } 

}
