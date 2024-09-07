import { Component, EventEmitter, inject, Input, OnChanges, Output} from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/IUser.interface';
import { IPerson } from '../../interfaces/IPerson.interface';

@Component({
  selector: 'app-new-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-user-form.component.html',
  styleUrl: './new-user-form.component.scss'
})
export class NewUserFormComponent implements OnChanges{

  @Input() selectedUser : IUser | null = null
  @Output() deleteUserEvent = new EventEmitter<IUser>()

  private readonly _requestService = inject(RequestService)

  userForm: FormGroup = new FormGroup({
      userName: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
      password: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
      password2: new FormControl('',Validators.required),
      email: new FormControl('',Validators.required),

      personName: new FormControl('',Validators.required),
      cpf: new FormControl('',Validators.required),
      phone: new FormControl('',Validators.required),

    });

    ngOnChanges(): void {
      if(this.selectedUser !== null){
        this.userForm.patchValue({
          userName: [this.selectedUser!.name],
          password: [''],
          password2: [''],
          email: [this.selectedUser!.email],
    
          personName: [this.selectedUser!.person?.name],
          cpf: [this.selectedUser!.person?.cpf],
          phone: [this.selectedUser!.person?.phone],
        })
        this._submitUserToService = this._functionPut
      } else {
        this.userForm.reset()
      }
    }

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

      this._submitUserToService(user)
      this._submitUserToService = this._functionPost
    }

    private readonly _functionPost =  (user : IUser) => {
      this._requestService.postNewUser(user)
      .subscribe()
    }
    private readonly _functionPut =  (user : IUser) => {
      this._requestService.postNewUser(user)
      .subscribe()
    }
    private _submitUserToService = this._functionPost

    verifyIsPasswordValid(){
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
      this.passwordVisibility = (this.passwordVisibility === "password")? "text" : "password"; 
    }
    togglePassword2Visibility(){
      this.password2Visibility = (this.password2Visibility === "password")? "text" : "password";
    }

    clearForm() {
      this.selectedUser = null
      this.userForm.reset()
      this._submitUserToService = this._functionPost
    }

    deleteSelectedUser($user : IUser){
      this.deleteUserEvent.emit($user)
    }

}
