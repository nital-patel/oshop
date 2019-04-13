import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {AppUser} from './models/app.user';
import {UserService} from './user.service';
import 'rxjs-compat/add/operator/switchMap';

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService) {
    this.user$ = afAuth.authState;
  }
  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => this.userService.get(user.uid));
  }
}
