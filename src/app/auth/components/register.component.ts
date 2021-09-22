import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { registerAction } from "../store/actions";

@Component({
    selector : 'mg-register',
    templateUrl : './register.component.html',
    styleUrls : ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

    form! : FormGroup;

    formObject = {
        username : ['', Validators.required],
        password : '',
        email : ''
    };

    constructor(private fb : FormBuilder, private store : Store){}

    initializeForm(): void{
        this.form = this.fb.group(this.formObject);
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    submitMyForm(): void{
        console.log("Submitting: ", this.form.value);
        this.store.dispatch(registerAction(this.form.value));
    }

}