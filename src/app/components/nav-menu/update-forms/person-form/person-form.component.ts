import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../../../services/request.service';
import { IUser } from '../../../../interfaces/IUser.interface';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent implements OnInit{

  personForn: FormGroup = new FormGroup({
    personName: new FormControl('',Validators.required),
    cpf: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
  });
  
  private readonly _usersService = inject(RequestService)
  private _currentUser : IUser | null = null;

  ngOnInit(): void {

    this._usersService.getCurrentUserInfo().subscribe( user => 
    {
      this._currentUser = user;
      if(user.person !== null){
        this.personForn.patchValue({
          personName: [user.person?.name],
          cpf: [user.person?.cpf],
          phone: [user.person?.phone]
        })
      }
    })
      
  }

}
