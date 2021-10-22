import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { FeedService } from './services/feed.service';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from './store/effects/getFeed.effect';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [];

@NgModule({
  declarations: [
    FeedComponent
  ],
  imports: [
    CommonModule
    ,RouterModule.forChild(routes)
    , EffectsModule.forFeature([GetFeedEffect])
    , StoreModule.forFeature('feed',reducers)
  ],
  exports : [
    FeedComponent
  ],
  providers : [FeedService]
})
export class FeedModule { }
