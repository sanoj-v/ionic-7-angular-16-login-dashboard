import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import { ApiFacadeService } from '../../services/api-facade.service';
import { UiFacadeService } from '../../services/ui-facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm!: FormGroup;
  buttonConfig: { text: string, disable: boolean } = { text: 'Submit', disable: false };
  uuid: string = '';
  constructor(private _fB: FormBuilder,
    private _router: Router,
    private apiFacadeService: ApiFacadeService,
    public uiFacadeService: UiFacadeService) {
    this.createForm();
    console.log('----', apiFacadeService.isAuthenticated());
  }

  async ngOnInit() {
    const { identifier } = await Device.getId();
    this.uuid = identifier;
  }

  createForm() {
    this.loginForm = this._fB.group({
      id: new FormControl(''),
      username: new FormControl('test', [Validators.required]),
      password: new FormControl('test', [Validators.required]),
      uuid: new FormControl(this.uuid)
    });
  }

  onSubmit() {
    this.buttonConfig = { text: 'Please wait...', disable: true };
    const formValue = this.loginForm.getRawValue();
    const userInfo = {
      id: '1',
      name: 'sanoj',
      role: 'admin'
    }
    this.uiFacadeService.setLogin(userInfo);
    this.redirect();
  }

  redirect() {
    this.buttonConfig = { text: 'Submit', disable: false };
    this._router.navigate(['dashboard']);
  }

  formReset() {
    this.loginForm.reset();
    this.loginForm.patchValue({
      id: '',
      uuid: this.uuid
    })
  }
}