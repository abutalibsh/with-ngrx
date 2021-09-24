import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";

import { RegisterComponent } from "src/app/auth/components/register.component";
import { reducers } from "src/app/auth/store/reducers";
import { AuthService } from "src/app/auth/service/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { RegisterEffect } from "src/app/auth/store/effects/register.effect";
import { BackendErrorMessagesModule } from "../shared/modules/backendErrorMessages/backendErrorMessages.module";
import { PersistanceService } from "../shared/services/persistance.service";

const routes: Routes = [{path: 'register', component : RegisterComponent}];

@NgModule({
    imports : [CommonModule, 
               RouterModule.forChild(routes),
               ReactiveFormsModule,
               StoreModule.forFeature('auth', reducers),
               EffectsModule.forFeature([RegisterEffect]),
               BackendErrorMessagesModule
            ],
    declarations : [RegisterComponent],
    providers : [AuthService, PersistanceService]
})
export class AuthModule{

}