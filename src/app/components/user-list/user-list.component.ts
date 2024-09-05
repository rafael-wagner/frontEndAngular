import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser.interface';
import { RequestService } from '../../services/request.service';
import { take } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewUserFormComponent } from "../new-user-form/new-user-form.component";
import { IPerson } from '../../interfaces/IPerson.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NewUserFormComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  private readonly _usersService = inject(RequestService)

  userSearchForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('')
  });

  @Input() users : IUser[] = [
    {
      name:'test1'
      ,email:'test1@test.com'
      ,person:{
        cpf:"12345678987"
        ,name:"nome teste um"
        ,phone:"12345678987"
      }
    }
    ,{
      name:'test2'
      ,email:'test2@test.xyz'
      ,person:{
        cpf:"12345678978"
        ,name:"nome teste dois"
        ,phone:"12345678978"
      }
    }
    ,{
      name:'test3'
      ,email:'test3@email.abcde'
      ,person:{
        cpf:"12345678948"
        ,name:"nome teste tres"
        ,phone:"12345678948"
      }
    }
  ]

  selectedUser: IUser | null = null

  selectUser($user : IUser){
    this.selectedUser = $user;

    this.userForm.patchValue({
      userName: [$user.name],
      password: [''],
      password2: [''],
      email: [$user.email],

      personName: [$user.person?.name],
      cpf: [$user.person?.cpf],
      phone: [$user.person?.phone],
    })
  }

  deleteUser(user : IUser | null){
    if(user !== null){
      this._usersService.deleteUser(user).subscribe();
      this.selectedUser = null;
      this.users = this.users.filter(u => u.name !== user.name)
    }
  }


  searchFormOnSubmitEvent() {
    this._usersService
      .getUsersList(this.userSearchForm.value.username,this.userSearchForm.value.email)
      .pipe(take(1))
      .subscribe(userList => this.users = userList)
  }


// CONTEUDO DE FORMS
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
  }

  private _submitUserToService = (user : IUser) => {
    this._requestService.postNewUser(user)
    .subscribe()
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
    this.passwordVisibility = (this.passwordVisibility === "password")? "text" : "password"; 
  }
  togglePassword2Visibility(){
    this.password2Visibility = (this.password2Visibility === "password")? "text" : "password";
  }

}
