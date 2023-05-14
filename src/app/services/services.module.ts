import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { ApiFacadeService } from './api-facade.service';
import { UiFacadeService } from './ui-facade.service';

@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        LoginService,

        ApiFacadeService,
        UiFacadeService
    ]
})
export class ServicesModule { }