import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/global-feed/global-feed.component';
import { RouterModule, Routes } from '@angular/router';

import { FeedModule } from 'src/app/shared/modules/feed/feed.module';
import { BannerModule } from 'src/app/shared/modules/banner/banner.module';


const routes : Routes=[
  {path: '', component : GlobalFeedComponent}
];

@NgModule({
  declarations: [
    GlobalFeedComponent
  ],
  imports: [
    CommonModule
    ,BannerModule
    ,RouterModule.forChild(routes)
    ,FeedModule
  ]
})
export class GlobalFeedModule { }
