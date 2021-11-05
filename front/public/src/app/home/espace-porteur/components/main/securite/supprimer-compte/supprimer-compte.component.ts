import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';
import {
  PorteurService,
} from 'src/app/shared/services/porteur-service/porteur.service';

@Component({
  selector: 'app-supprimer-compte',
  templateUrl: './supprimer-compte.component.html',
  styleUrls: ['./supprimer-compte.component.css']
})
export class SupprimerCompteComponent implements OnInit {
  dataUser: any;
  public themeLogo: string = 'assets/images/wazindotrans.png';
  motif: string = '';
  constructor(private localStorageService: LocalStorageService, private toastr: ToastrService, private porteurService: PorteurService, private router: Router) {
    this.dataUser = this.localStorageService.getUser();
    console.log(this.dataUser);
  }

  ngOnInit(): void {
  }

  deleteProfil() {
    let data: any = {
      'email': this.dataUser.email,
      'motif': this.motif
    }
    console.log(data);
    this.porteurService.deleteProfil(data).subscribe((result) => {
      console.log(result);

      if (result === undefined) {
        let error: string = 'Une erreur est survenue lors de la suppression de votre profil. Veuillez réessayer.';
        this.toastr.error(error, "Attention", { positionClass: 'toast-top-center' });
        return;
      }

      if (result.status === "error") {
        this.toastr.error(result.message, "Attention", { positionClass: 'toast-top-center' });

        let error: string = result.message;
        alert(error);
        return;
      } else {
        this.toastr.success(result.message, 'Attention', { positionClass: 'toast-top-center' });
        this.motif = "";
      }
    });

  }

}
