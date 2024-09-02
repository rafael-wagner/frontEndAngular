import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent {

personForn: FormGroup = new FormGroup({

  personName: new FormControl('',Validators.required),
  cpf: new FormControl('',Validators.required),
  phone: new FormControl('',Validators.required),

});

}
