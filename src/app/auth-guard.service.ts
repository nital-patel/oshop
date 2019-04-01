import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import 'rxjs-compat/add/operator/map';
import {AuthGuardService} from './auth-guard.service.ts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) { }
  CanActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      if (user) { return true; }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    });
  }
}
