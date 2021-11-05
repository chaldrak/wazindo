import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-configuer-notification',
  templateUrl: './configuer-notification.component.html',
  styleUrls: ['./configuer-notification.component.css']
})
export class ConfiguerNotificationComponent implements OnInit {
  public themeLogo: string = 'assets/images/wazindotrans.png';

  constructor() { }

  ngOnInit(): void {
  }

}
