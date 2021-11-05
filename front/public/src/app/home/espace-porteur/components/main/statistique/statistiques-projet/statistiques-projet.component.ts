import {
  Component,
  OnInit,
} from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';
import { PublicService } from 'src/app/shared/services/public.service';

@Component({
  selector: 'app-statistiques-projet',
  templateUrl: './statistiques-projet.component.html',
  styleUrls: ['./statistiques-projet.component.css']
})
export class StatistiquesProjetComponent implements OnInit {
  statistiqueList: any = {};
  dataUser: any = {};
  projectReference: string;
  projectsList: any[] = [];
  public themeLogo: string = 'assets/images/wazindotrans.png';

  // tslint:disable-next-line:max-line-length
  constructor(private publicService: PublicService, private toastr: ToastrService, private porteurService: PorteurService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.dataUser = this.localStorageService.getUser();
    this.getListProjetByCategory();
  }


  //récupérer les projets par catégorie
  getListProjetByCategory(): void {
    let data: any = {
      'email_address': this.dataUser.email,
      'statut': ""
    };

    //this.isLoading = true;

    this.porteurService.getListProjetByUser(data).subscribe(
      (result: any) => {
        //this.isLoading = false;
        //console.log(result);
        let resp = result;

        if (resp === null || resp === undefined) {
          this.projectsList = this.projectsList;
          return;
        }
        if (resp.status === "error") {
          this.projectsList = this.projectsList;
          return;
        }
        this.projectsList = resp.data;

        console.log(this.projectsList);


      },
      err => {
        //this.isLoading = false;

        return;
      }
    );
  } //end getListProjetByCategory


  //récupérer la liste des statistiques
  showStats(): void {
    if (this.projectReference === null || this.projectReference === '' || this.projectReference === undefined) {
      this.toastr.error('Veuillez sélectionner un projet', "Statistique", { positionClass: 'toast-top-center' });
      return;
    }

    this.porteurService.getListStatistiques(this.projectReference).subscribe(
      (result: any) => {
        console.log(result);
        let resp = result;

        if (resp === null || resp === undefined) {
          this.statistiqueList = this.statistiqueList;
          return;
        }
        if (resp.status === "error") {
          this.statistiqueList = this.statistiqueList;
          return;
        }

        this.statistiqueList = resp.data;

      },
      err => {
        return;
      }
    );
  } //end showStats
}
