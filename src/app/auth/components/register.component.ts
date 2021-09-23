import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { registerAction } from "src/app/auth/store/actions";
import { isSubmittingSelector } from "src/app/auth/store/selectors";

@Component({
    selector : 'mg-register',
    templateUrl : './register.component.html',
    styleUrls : ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

    form! : FormGroup;
    isSubmitting$! : Observable<boolean>;

    formObject = {
        username : ['', Validators.required],
        password : '',
        email : ''
    };

    constructor(private fb : FormBuilder, private store : Store){}

    initializeForm(): void{
        this.form = this.fb.group(this.formObject);
    }

    initializeValues(): void{
        this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    }

    ngOnInit(): void {
        this.initializeForm();
        this.initializeValues();
    }

    submitMyForm(): void{
        console.log("Submitting: ", this.form.value);
        this.store.dispatch(registerAction(this.form.value));
    }

}