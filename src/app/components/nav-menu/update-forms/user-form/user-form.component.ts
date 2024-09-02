import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../../interfaces/IUser.interface';
import { RequestService } from '../../../../services/request.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit{

  private readonly _usersService = inject(RequestService)
  private readonly _fb = inject(FormBuilder)


  ngOnInit(): void {


    this.userForm = this._fb.group({
      userName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      password2: ['',Validators.required],
    })

    this._usersService.getCurrentUserInfo().subscribe( user => this.userForm.patchValue({
          userName: [user.name],
          email: [user.email]
    }))

    
  }


  userForm: FormGroup = new FormGroup({})
  // = new FormGroup({
  //   userName: new FormControl('',Validators.required),
  //   email: new FormControl('',Validators.required),
  //   password: new FormControl('',Validators.required),
  //   password2: new FormControl('',Validators.required),
  // });

  private readonly _requestService = inject(RequestService)



  userFormOnSubmitEvent() {
    this.verifyIsPasswordValid()

    const user : IUser = {
      name:this.userForm.value.username
      ,password: this.userForm.value.password
      ,email: this.userForm.value.email
    }

    this._requestService.putUpdateUser(user)

  }

  verifyIsPasswordValid(){
      if(this.userForm.value.password !== this.userForm.value.password2){
        throw new Error('Não implementado');
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
