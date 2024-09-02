import { Component, inject, Input, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/IUser.interface';
import { RequestService } from '../../services/request.service';
import { take } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
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
        cpf:"13245678977"
        ,name:"nome teste um"
        ,phone:"12345678977"
      }
    }
    ,{
      name:'test2'
      ,email:'test2@test.xyz'
      ,person:{
        cpf:"13245678977"
        ,name:"nome teste dois"
        ,phone:"12345678977"
      }
    }
    ,{
      name:'test3'
      ,email:'test3@email.abcde'
      ,person:{
        cpf:"13245678977"
        ,name:"nome teste tres"
        ,phone:"12345678977"
      }
    }
  ]

  selectedUser: IUser | null = null

  selectUser($user : IUser){
    this.selectedUser = $user;
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

}
