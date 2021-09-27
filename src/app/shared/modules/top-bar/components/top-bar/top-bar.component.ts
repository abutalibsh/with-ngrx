import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { currentUserSelector, isLoggedInSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'mg-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  isLoggedIn$ : Observable<boolean>;
  currentUser$ : Observable<CurrentUserInterface> | null;

  constructor(private store : Store) { }

  ngOnInit(): void {
    this.initializeValue();
  }

  initializeValue(){
    this.isLoggedIn$= this.store.pipe(select(isLoggedInSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector))
  }

}
