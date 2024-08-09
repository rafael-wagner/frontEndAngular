import { Component, inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/IUser.interface';
import { IPerson } from '../../interfaces/IPerson.interface';

@Component({
  selector: 'app-new-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-form.component.html',
  styleUrl: './new-user-form.component.scss'
})
export class NewUserFormComponent {
  private readonly _requestService = inject(RequestService)

  userForm: FormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      password2: new FormControl(''),
      email: new FormControl(''),

      personName: new FormControl(''),
      cpf: new FormControl(''),
      phone: new FormControl(''),


    });

  userFormOnSubmitEvent() {
    this.verifyIsPasswordValid()

    const person : IPerson = {
      cpf: this.userForm.value.cpf
      ,name: this.userForm.value.personName
      ,phone: this.userForm.value.phone

    }

    const user : IUser = {
      name:this.userForm.value.username
      ,password: this.userForm.value.password
      ,email:this.userForm.value.email

      ,person:person
    }

    let resp : any = ''

    this._requestService.postNewUser(user)
    .subscribe(
      response => 
      {
        resp = response
      }        
    )

    console.log(resp)
  }

  verifyIsPasswordValid(){
    // TODO implementar avisos e validação

      const isNameValid : boolean = this.userForm.value.username !== '' && this.userForm.value.username !== null
      const isPasswordValid: boolean = this.userForm.value.password !== this.userForm.value.password2 && this.userForm.value.password !== ''

      const validName : boolean = this.userForm.value.username
      console.log(validName)

      if(!isNameValid && !isPasswordValid){
        throw new Error('Não implementado: nome ou senha invalidos');
      }
  }

  passwordVisibility: "password" | "text" = "password";
  password2Visibility: "password" | "text" = "password";
  togglePasswordVisibility(){
    this.passwordVisibility = this.passwordVisibility === "password"? "text" : "password";
    this.passwordVisibility = this.password2Visibility === "password"? "text" : "password";
  }

}
