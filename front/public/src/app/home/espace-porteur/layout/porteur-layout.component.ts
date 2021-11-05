import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
//import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-porteur-layout',
  templateUrl: './porteur-layout.component.html',
  styleUrls: ['./porteur-layout.component.scss']
})
export class PorteurLayoutComponent implements OnInit {


  constructor( public location: Location, private router: Router) {}

  ngOnInit() {

  }

  ngAfterViewInit() {
      this.runOnRouteChange();
  }

  runOnRouteChange(): void {

  }



}
