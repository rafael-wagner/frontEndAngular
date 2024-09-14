import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from '../../../editForms/userEditForms/user-form/user-form.component';
import { AddressFormComponent } from '../../../editForms/userEditForms/address-form/address-form.component';
import { PersonFormComponent } from '../../../editForms/userEditForms/person-form/person-form.component';
import { IAddress } from '../../../../interfaces/IAddress.interface';
import { IUser } from '../../../../interfaces/IUser.interface';
import { RequestService } from '../../../../services/request.service';


@Component({
  selector: 'app-tab-items',
  standalone: true,
  imports: [
    CommonModule
    , ReactiveFormsModule
    , UserFormComponent
    , AddressFormComponent
    , PersonFormComponent
  ],
  templateUrl: './tab-items.component.html',
  styleUrl: './tab-items.component.scss'
})
export class TabItemsComponent {

  private readonly _requestService = inject(RequestService)
  readonly menuItems : string[] = ['Dados de Usuário','Dados Pessoais','Dados de Endereço']
  
  editForm : FormGroup = new FormGroup({})

  selectedIndex = 0

  selectIndex(index: number) {
    this.selectedIndex = index
  }

  editFormOnSubmitEvent() {

    const address : IAddress = this.editForm.value.addressForm as IAddress

    const editUser : IUser = {
      name: this.editForm.value.userForm.userName
      ,email: this.editForm.value.userForm.email
      ,password: this.editForm.value.userForm.password

      ,person: {
        name: this.editForm.value.personForm.personName
        ,phone: this.editForm.value.personForm.phone
        ,cpf: this.editForm.value.personForm.cpf
        ,address: address
      }
    } 

    this._requestService.putUpdateUser(editUser).subscribe()
  }

}
