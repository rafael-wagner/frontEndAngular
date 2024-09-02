import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../../../services/request.service';
import { IUser } from '../../../../interfaces/IUser.interface';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit{
  
  private readonly _fb = inject(FormBuilder)
  private readonly _usersService = inject(RequestService)
  private currentUser : IUser | null = null;

  addressForm : FormGroup = this._fb.group({
    postalCode: ['',Validators.required],
    lane: ['',Validators.required],
    number: ['',Validators.required],
    city: ['',Validators.required],
    state: ['',Validators.required],
    landmark: ['',Validators.required],
  })

  ngOnInit(): void {
    this._usersService.getCurrentUserInfo().subscribe( user => 
      {
        this.currentUser = user;
        if(user.person !== null && user.person?.address !== null){
          this.addressForm.patchValue({
            postalCode: [user.person?.address?.postalCode],
            lane: [user.person!.address!.lane],
            number: [user.person!.address!.number],
            city: [user.person!.address!.city],
            state: [user.person!.address!.state],
            landmark: [user.person!.address!.landmark],
          })
        }
      })
  }

  addressFormOnSubmitEvent() {
    throw new Error('Method not implemented.');
  }

}
