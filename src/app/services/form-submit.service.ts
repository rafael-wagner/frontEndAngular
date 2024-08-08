import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormSubmitService {

  constructor() { }

  public submitForms$: Subject<any> = new Subject();
  formValues$: Observable<any> | undefined;

}
