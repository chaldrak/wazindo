import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer-ecolis',
  templateUrl: './footer-ecolis.component.html',
  styleUrls: ['./footer-ecolis.component.scss']
})
export class FooterEcolisComponent implements OnInit {

  @Input() class: string; // Default class 
  @Input() themeLogo: string = environment.themeLogo; // Default Logo
  @Input() newsletter: boolean = true; // Default True

  public today: number = Date.now();

  constructor() { }

  ngOnInit(): void {
  }

}

