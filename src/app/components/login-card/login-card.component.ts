
import { Component, inject } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IUserLogin } from '../../interfaces/IUserLogin.interface';

@Component({
  selector: 'app-login-card',
  standalone: true,
  imports: [
    ReactiveFormsModule
    ,RouterLink
    ,RouterOutlet,
  ],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {
  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router)
  private readonly _requestService = inject(RequestService)

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });


  eventLogin() {    
    const user : IUserLogin = {
      name : this.loginForm.value.username
      ,password: this.loginForm.value.password
    }

    this._requestService.postLogin(user)
      .subscribe(
        response => 
        {
          const token = response.accessToken;
          if(token){
            this._authService.setAuthToken(token)
            this._router.navigate(['home'])
          }
        }        
      )

  }

  passwordVisibility: "password" | "text" = "password";
  togglePasswordVisibility(){
    this.passwordVisibility = this.passwordVisibility === "password"? "text" : "password";
  }

}

