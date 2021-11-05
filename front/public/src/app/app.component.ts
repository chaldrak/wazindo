import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AdminService } from './shared/services/admin.service';
import { LocalStorageService } from './shared/services/localstorage.service';




import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map(v => v[1]),
  );
  ligneList : any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private loader: LoadingBarService,private localStorageService : LocalStorageService, translate: TranslateService, private publicService : AdminService) {
        if (isPlatformBrowser(this.platformId)) {
          translate.setDefaultLang('en');
          translate.addLangs(['en', 'fr']);
        }

        const k = window.globalThis;
        k.LogRocket && k.LogRocket.init('evyipb/wazindo');

  }





}
