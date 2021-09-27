import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [];

@NgModule({
  declarations: [
    TopBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports : [TopBarComponent]
})
export class TopBarModule { }
