import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UiFacadeService } from '../services/ui-facade.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    constructor(
        private router: Router,
        private uiFacadeService: UiFacadeService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.uiFacadeService.getLogin();
        if (user) {
            this.uiFacadeService.setLoggedIn(true);
            return true;
        }
        this.router.navigateByUrl('login');
        return false;
    }
}