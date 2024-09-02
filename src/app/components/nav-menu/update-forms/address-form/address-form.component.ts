import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {
addressFormOnSubmitEvent() {
throw new Error('Method not implemented.');
}
  addressForm: FormGroup = new FormGroup({

    cep: new FormControl('',Validators.required),
    lane: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    number: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    landmark: new FormControl('',Validators.required),

  });

}
