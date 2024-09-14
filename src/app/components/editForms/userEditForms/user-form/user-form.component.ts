import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../../interfaces/IUser.interface';
import { RequestService } from '../../../../services/request.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit, OnChanges{

  @Input({ required: true }) form! : FormGroup
  @Input() user : IUser | null = null

  private readonly _fb = inject(FormBuilder)

  get userForm () : FormGroup {
    return this.form.get('userForm') as FormGroup
  }

  ngOnInit() {
    this.form.addControl('userForm', 
      this._fb.group({
        userName: ['',Validators.required],
        email: ['',Validators.required],
        password: [''],
        password2: [''],
      })
    )

    if(this.user != null){
      this.fillUseForm(this.user)
    }
  }

  ngOnChanges(): void {
    if(this.user != null){
      this.fillUseForm(this.user)
    }
  }


  fillUseForm(user : IUser){
    this.userForm.patchValue({
      userName: [user.name],
      email: [user.email]
    })
  }

  verifyIsPasswordValid(){
      if(this.userForm.value.password !== this.userForm.value.password2){
        throw new Error('Validação de password não implementado');
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
