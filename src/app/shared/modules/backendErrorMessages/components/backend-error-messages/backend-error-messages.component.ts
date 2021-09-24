import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

@Component({
  selector: 'mg-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrls: ['./backend-error-messages.component.scss']
})
export class BackendErrorMessagesComponent implements OnInit {

  @Input('backendErrors') backendErrorsInput : BackendErrorsInterface;

  errorMessages : string[];

  constructor() { }

  ngOnInit(): void {
    // console.log(this.backendErrorsInput);
    this.errorMessages = Object.keys(this.backendErrorsInput).map((fieldName : string) => {
      const message = this.backendErrorsInput[fieldName];
      return `${fieldName} ${message}`;
    })
  }

}
