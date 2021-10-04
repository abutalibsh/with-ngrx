import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getFeedAction } from '../../store/actions/getFeed.action';
import { dataSelector, errorsSelector, isLoadingSelector } from '../../store/selectors';
import { GetFeedResponseInterface } from '../../types/getFeedResponse.interface';

@Component({
  selector: 'mg-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  feed$: Observable<GetFeedResponseInterface | null>
  error$ : Observable<String | null>
  isLoading$ : Observable<boolean>

  @Input('apiUrl') apiUrlProps : string;

  constructor(private store : Store) { }

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(dataSelector));
    this.error$ = this.store.pipe(select(errorsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
  }

  fetchData() : void{
    this.store.dispatch(getFeedAction({url : this.apiUrlProps}));
  }

}
