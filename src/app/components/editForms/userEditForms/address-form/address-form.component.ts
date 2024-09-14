import { Component, inject, Input, OnInit, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAddress } from '../../../../interfaces/IAddress.interface';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit{
  
  @Input({ required:true }) form! : FormGroup 

  @Input() address : IAddress | null = null

  private readonly _fb = inject(FormBuilder)

  get addressForm (): FormGroup {
    return this.form.get('addressForm') as FormGroup
  }

  get postalCode (): FormControl {
    return this.form.get('addressForm')!.get('postalCode') as FormControl
  }
  
  get lane (): FormControl {
    return this.form.get('addressForm')!.get('lane') as FormControl
  }

  get number (): FormControl {
    return this.form.get('addressForm')!.get('number') as FormControl
  }

  get city (): FormControl {
    return this.form.get('addressForm')!.get('city') as FormControl
  }

  get state (): FormControl {
    return this.form.get('addressForm')!.get('state') as FormControl
  }

  get landmark (): FormControl {
    return this.form.get('addressForm')!.get('landmark') as FormControl
  }

  ngOnInit(): void {
    this.form.addControl('addressForm',this._fb.group({
      postalCode: ['',Validators.required],
      lane: ['',Validators.required],
      number: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      landmark: ['',Validators.required],
    })
   )

   if(this.address != null){
    this.fillAddressForm(this.address)
   }
  }

  fillAddressForm(address : IAddress){

      this.form.patchValue ({ 
        addressForm :{
          postalCode: [address.postalCode],
          lane: [address.lane],
          number: [address.number],
          city: [address.city],
          state: [address.state],
          landmark: [address.landmark], 
        }
      })
  }

}
