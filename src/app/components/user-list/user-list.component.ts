import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/IUser.interface';
import { RequestService } from '../../services/request.service';
import { take } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewUserFormComponent } from "../new-user-form/new-user-form.component";
import { UserFormComponent } from "../editForms/userEditForms/user-form/user-form.component";
import { PersonFormComponent } from "../editForms/userEditForms/person-form/person-form.component";
import { IPerson } from '../../interfaces/IPerson.interface';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NewUserFormComponent, UserFormComponent, PersonFormComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  private readonly _usersService = inject(RequestService)

  userSearchForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('')
  });

  editForm : FormGroup = new FormGroup({})

  selectedUser: IUser | null = null

  get selectedPerson (): IPerson | null {

    if(this.selectedUser !== null && this.selectedUser.person !== undefined){
      return this.selectedUser.person
    }
    return null
  }

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

  selectUser($user : IUser | null){

    if($user !== null){
      this.selectedUser = $user;
    }

  }

  deleteUser($user : IUser | null){
    if($user !== null){
      this._usersService.deleteUser($user).subscribe();
      this.selectedUser = null;
      this.users = this.users.filter(u => u.name !== $user.name)
    }
  }

  searchFormOnSubmitEvent() {
    this._usersService
      .getUsersList(this.userSearchForm.value.username,this.userSearchForm.value.email)
      .pipe(take(1))
      .subscribe(userList => this.users = userList)
  }



}
