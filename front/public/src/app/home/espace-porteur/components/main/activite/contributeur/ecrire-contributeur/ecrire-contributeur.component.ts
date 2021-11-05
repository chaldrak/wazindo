import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-ecrire-contributeur',
  templateUrl: './ecrire-contributeur.component.html',
  styleUrls: ['./ecrire-contributeur.component.css']
})
export class EcrireContributeurComponent implements OnInit {
  public themeLogo: string = 'assets/images/wazindotrans.png';

  constructor() { }

  ngOnInit(): void {
  }

}
