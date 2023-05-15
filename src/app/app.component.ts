import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { UiFacadeService } from './services/ui-facade.service';
import { NetworkService } from './_helper/network.helper';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { environment } from '../environments/environment';
import { PLATFORM_DEVICE } from './data-models/enums';
import { KeepAwake } from '@capacitor-community/keep-awake';
import { PrivacyScreen } from '@capacitor-community/privacy-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public pageList = [
    {
      iconName: 'home', displayText: 'Home', expanded: false, hasChild: false,
      subOptions: []
    },
    {
      iconName: 'list', displayText: 'Product List', expanded: false, hasChild: false,
      subOptions: [
        { iconName: 'card', displayText: 'Search List', url: '/list' },
        { iconName: 'cash', displayText: 'Search List2', url: '/list1' },
        { iconName: 'clock', displayText: 'Infinite Scroll List', url: '/list2' },
        { iconName: 'clock', displayText: 'Product Card List', url: '/list3' },
        { iconName: 'clock', displayText: 'News List', url: '/list4' },
      ]
    },
    {
      iconName: 'flame', displayText: 'Animation List', expanded: false, hasChild: false,
      subOptions: [
        { iconName: 'flask', displayText: 'Flip List ', url: '/animation-list1' },
        { iconName: 'headset', displayText: 'Slide List', url: '/animation-list2' },
        { iconName: 'infinite', displayText: 'Slide Left List', url: '/animation-list3' },
        { iconName: 'leaf', displayText: 'Rotate List', url: '/animation-list4' },
      ]
    },
    {
      iconName: 'radio-button-on', displayText: 'Sliding，reorder,Select', expanded: false, hasChild: false,
      subOptions: [
        { iconName: 'map', displayText: 'Sliding List', url: '/list-sliding' },
        { iconName: 'magnet', displayText: 'Reorder List', url: '/list-reorder' },
        { iconName: 'moon', displayText: 'Checkbox List', url: '/list-checkbox' },
        { iconName: 'microphone', displayText: 'Radio Group List', url: '/list-radio' },
      ]
    },
    {
      iconName: 'flower', displayText: 'Progress', expanded: false, hasChild: false,
      subOptions: [
        { iconName: 'link', displayText: 'Infinite Scroll', url: '/loading2' },
        { iconName: 'move', displayText: 'Top Loading', url: '/loading3' },
        { iconName: 'play', displayText: 'Card Skeleton List', url: '/loading5' },
        { iconName: 'play-circle', displayText: 'Profile Skeleton List', url: '/loading6' }
      ]
    }
  ];

  isLoggedIn = false;
  isNetAvailable = true;
  constructor(public uiFacadeService: UiFacadeService,
    private _platform: Platform,
    private _router: Router,
    private _network: NetworkService) {
    this.initializeService();
    this.callNetwork();
    this.initializeApp();
  }

  initializeService() {
    //this.loadLogin();
  }

  callNetwork() {
    this._network.initNetwork();
    this._network.getConnectedStatus.subscribe((value: boolean) => {
      this.isNetAvailable = value;
    })
  }

  initializeApp() {
    App.addListener('backButton', () => {
      this._router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          if (event.url.indexOf('/dashboard') != -1) {
            App.exitApp();
          }
        }
      });
    });
    this._platform.pause.subscribe(async () => { });
    this._platform.ready().then(() => {
      this.detectPlatform();
      this._router.navigateByUrl('login');
    });
  }

  detectPlatform(): void {
    if (this._platform.is('android')) {
      environment.platform = PLATFORM_DEVICE.ANDROID;
      this.intializeScreenAwake();
    } else if (this._platform.is('ios')) {
      environment.platform = PLATFORM_DEVICE.IOS;
      this.intializeScreenAwake();
    } else {
      console.log('The platform is not supported');
    }
  }

  async intializeScreenAwake() {
    try {
      await KeepAwake.keepAwake();
      await PrivacyScreen.enable();
    } catch (e) {
      console.log('Screen Awake & Privacy screen not working in web');
    }
  }

  logout() {
    this.uiFacadeService.removeLocalStorage();
    this._router.navigateByUrl('login');
  }
}
