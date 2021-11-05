import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { BlogSlider } from '../../../shared/data/slider';

@Component({
  selector: 'app-pubsolidaire',
  templateUrl: './pub-solidaire.component.html',
  styleUrls: ['./pub-solidaire.component.scss']
})
export class ProjectComponent implements OnInit {
  pourcentageProject: number = 0;
  @Input() projects: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  //get percentage on project
  getPercentageOnProject(projectItem: any) {
    const data = (projectItem.montant_collecte / projectItem.montant_a_collecte) * 100;
    const value: string = data + '%';
    return (value);
  }//end getPercentageOnProjectprojectItem

  //get percentage on project
  getPercentageProject(projectItem: any) {
    const data = (projectItem.montant_collecte / projectItem.montant_a_collecte) * 100;
    const value: string = data + '%';
    return (value);
  }//end getPercentageOnProjectprojectItem

  public BlogSliderConfig: any = BlogSlider;

}
