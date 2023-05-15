import { Injectable } from '@angular/core';
import { ConnectionStatus, Network } from '@capacitor/network';
import { ToastController, ToastOptions } from '@ionic/angular';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {
    private online$ = new Subject<boolean>();
    getStatus = this.online$.asObservable();
    constructor(private toastController: ToastController) { }

    async initNetwork() {
        await this.logCurrentNetworkStatus();
    }

    get getConnectedStatus() {
        return this.getStatus;
    }

    private logCurrentNetworkStatus = async () => {
        const { connected } = await Network.getStatus();
        this.online$.next(connected);
        Network.addListener('networkStatusChange', (status: ConnectionStatus) => {
            this.online$.next(status.connected);
        });
    };

    async showToast(message: string) {
        const internetMessage = 'No Internet Connection';
        const config: ToastOptions = {
            message: message,
            cssClass: 'toast-bottom-error',
            position: 'bottom'
        };
        const toast = await this.toastController.create(config);
        if (message === internetMessage) {
            const image = document.createElement('img');
            image.setAttribute('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdy2IwOvSEV20njbQTEahuCb4q-gf_1ga4jA&usqp=CAU');
            image.setAttribute('height', '35');
            image.setAttribute('width', '35');
            image.setAttribute('alt', 'Profile logo');
            image.style.borderRadius = '50%';
            image.style.marginRight = '15px';
            toast.shadowRoot?.querySelector('.toast-message')?.prepend(image);
            toast.shadowRoot?.querySelector('.toast-message')?.classList.add('display__flex_img_text');
        }
        toast.present();
    }

    ngOnDestroy() {
        this.online$.unsubscribe();
    }
}