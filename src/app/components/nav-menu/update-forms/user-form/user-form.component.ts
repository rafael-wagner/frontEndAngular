import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../../../interfaces/IUser.interface';
import { RequestService } from '../../../../services/request.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  private readonly _requestService = inject(RequestService)

  userForm: FormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      password2: new FormControl(''),
    });

  userFormOnSubmitEvent() {
    this.verifyIsPasswordValid()

    const user : IUser = {
      name:this.userForm.value.username
      ,password: this.userForm.value.password
    }

    this._requestService.putUpdateUser(user)

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
