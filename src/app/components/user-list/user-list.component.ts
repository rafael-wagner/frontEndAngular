import { Component, inject, Input, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/IUser.interface';
import { RequestService } from '../../services/request.service';
import { take } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
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
    }
    ,{
      name:'test2'
      ,email:'test2@test'
    }
    ,{
      name:'test3'
      ,email:'test3@email'
    }
  ]

  selectedUser: IUser | null = null

  selectUser($user : IUser){
    this.selectedUser = $user;
  }

  deleteUser(arg0: ($user: IUser) => void) {
    // TODO this._usersService.deleteUser();
  }

  searchFormOnSubmitEvent() {
    this._usersService
    .getListUsers(this.userSearchForm.value.username,this.userSearchForm.value.email)
    .pipe(take(1))
    .subscribe(userList => this.users = userList)
  }



}
