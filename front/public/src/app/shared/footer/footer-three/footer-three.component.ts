import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-footer-three',
  templateUrl: './footer-three.component.html',
  styleUrls: ['./footer-three.component.scss']
})
export class FooterThreeComponent implements OnInit {

 
  @Input() class: string;
  @Input() themeLogo: string = 'assets/images/wazindo1.png'; // default Logo
  @Input() mainFooter: boolean = true; // Default true 
  @Input() subFooter: boolean = false; // Default false 
  
  public today: number = Date.now();
  
  constructor() { }

  ngOnInit(): void {
  }

}
