import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { RegisterComponent } from "src/app/auth/components/register/register.component";
import { reducers } from "src/app/auth/store/reducers";
import { AuthService } from "src/app/auth/service/auth.service";
import { RegisterEffect } from "src/app/auth/store/effects/register.effect";
import { BackendErrorMessagesModule } from "src/app/shared/modules/backendErrorMessages/backendErrorMessages.module";
import { PersistanceService } from "src/app/shared/services/persistance.service";
import { LoginComponent } from 'src/app/auth/components/login/login.component';

const routes: Routes = [
    {path: 'register', component : RegisterComponent},
    {path: 'login', component : LoginComponent}
];

@NgModule({
    imports : [CommonModule, 
               RouterModule.forChild(routes),
               ReactiveFormsModule,
               StoreModule.forFeature('auth', reducers),
               EffectsModule.forFeature([RegisterEffect]),
               BackendErrorMessagesModule
            ],
    declarations : [RegisterComponent, LoginComponent],
    providers : [AuthService, PersistanceService]
})
export class AuthModule{

}