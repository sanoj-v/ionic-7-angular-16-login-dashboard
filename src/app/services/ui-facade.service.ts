import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AppLocalStorage } from '../data-models/enums';
import { UserInfo } from '../data-models/interfaces';


@Injectable()
export class UiFacadeService {
    private loggedInSubject = new ReplaySubject<boolean>(1);
    public isLoggedIn$ = this.loggedInSubject.asObservable();

    public setLoggedIn(flag: boolean): void {
        this.loggedInSubject.next(flag);
    }

    setLogin(userInfo: UserInfo): void {
        localStorage.setItem(AppLocalStorage.USERINFO, JSON.stringify(userInfo));
        this.setLoggedIn(true);
    }

    getLogin(): UserInfo | null {
        const userInfo = localStorage.getItem(AppLocalStorage.USERINFO);
        if (userInfo) {
            try {
                return JSON.parse(userInfo);
            }
            catch {
                return null;
            }
        }
        return null;
    }

    removeLocalStorage(): void {
        this.setLoggedIn(false);
        localStorage.removeItem(AppLocalStorage.USERINFO);
    }
}