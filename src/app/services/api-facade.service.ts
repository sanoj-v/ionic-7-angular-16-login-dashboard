import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class ApiFacadeService {

    private _loginService!: LoginService;
    private get loginService(): LoginService {
        if (!this._loginService) {
            this._loginService = this.injector.get(LoginService);
        }
        return this._loginService;
    }

    constructor(private injector: Injector) {

    }

    isAuthenticated() {
        return this.loginService.isAuthenticated();
    }
}