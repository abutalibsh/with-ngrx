import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';
import { AuthService } from 'src/app/auth/service/auth.service';
import { isSubmittingSelector, validationErrorsSelector } from 'src/app/auth/store/selectors';
import { LoginRequestInterface } from 'src/app/auth/types/loginRequest.interface';
import { loginAction } from 'src/app/auth/store/actions/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form! : FormGroup;
    isSubmitting$! : Observable<boolean>;
    backendErrors$ : Observable<BackendErrorsInterface | null>;

  formObject = {
    email : ['', Validators.required],
    password : ['', Validators.required]
  }

  constructor(private fb : FormBuilder, private store : Store, private service : AuthService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValues();
  }

  initializeForm(){
    this.form = this.fb.group(this.formObject);
  }

  initializeValues(): void{
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector), 
    )
  }

  submitMyForm(): void{
    console.log("Submitting: ", this.form.value);
    const request : LoginRequestInterface = {
        user : this.form.value
    }
    this.store.dispatch(loginAction({request}));
}

}
