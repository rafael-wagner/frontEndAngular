import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/IUser.interface';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

@Output() userFormSubmitEvent = new EventEmitter<IUser>();

userForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl(''),
  });

  userFormOnSubmitEvent() {
    this.verifyIsPasswordValid()

    const newUser : IUser = {
      username:this.userForm.value.username
      ,password: this.userForm.value.password
    }

    this.userFormSubmitEvent.emit(newUser);
    console.log('submitted')

  }

  verifyIsPasswordValid(){
    // TODO implementar avisos e validação de senha
      if(this.userForm.value.password !== this.userForm.value.password2){
        throw new Error('Não implementado');
      }
  }

  passwordVisibility: "password" | "text" = "password";
  password2Visibility: "password" | "text" = "password";
  togglePasswordVisibility(){
    this.passwordVisibility = this.passwordVisibility === "password"? "text" : "password";
    this.passwordVisibility = this.password2Visibility === "password"? "text" : "password";
  }

}
