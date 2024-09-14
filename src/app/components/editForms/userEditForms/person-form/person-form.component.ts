import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPerson } from '../../../../interfaces/IPerson.interface';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent implements OnInit, OnChanges{


  @Input ({ required: true }) form! : FormGroup

  @Input() person : IPerson | null = null

  get personForm () : FormGroup {
    return this.form.get('personForm') as FormGroup
  }

  ngOnInit(): void {

    this.form.addControl('personForm', 
      new FormGroup({
        personName: new FormControl('',Validators.required),
        cpf: new FormControl('',Validators.required),
        phone: new FormControl('',Validators.required),
      })
    )

      if(this.person !== null) {
        this.fillPersonForm(this.person)
      }
  }

  ngOnChanges(): void {
    if(this.person !== null) {
      this.fillPersonForm(this.person)
    }
  }

  fillPersonForm(person : IPerson){
    this.personForm.patchValue({
      personName: [person.name],
      cpf: [person.cpf],
      phone: [person.phone]
    })
  }

}
