import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'mg-global-feed',
  templateUrl: './global-feed.component.html',
  styleUrls: ['./global-feed.component.scss']
})
export class GlobalFeedComponent implements OnInit {

  apiUrl : string = '/articles';

  constructor() { }

  ngOnInit(): void {
  }

}
