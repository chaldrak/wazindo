import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {LocalStorageService} from "../../home/espace-porteur/shared/services/app/localstorage.service";
// import {utilisateur} from "../model/utilisateur";


@Directive({ selector: '[hasRight]' })

export class HasRightDirective implements OnInit {

      constructor(
        private templateRef: TemplateRef<any>,
        private localStorage: LocalStorageService,
        private viewContainer: ViewContainerRef
      ) {}

      right: string;
      connUser: any;
      private rightsList: [];

      @Input() set hasRight(right: string) {
        this.right = right;
      }

      ngOnInit() {
        //get rights
        this.connUser = this.localStorage.getUser();

        if(this.connUser === undefined || this.connUser === null) {
            this.viewContainer.clear(); return;
        }

        this.rightsList = this.connUser.autorisations;

        if(this.right === undefined) { this.right = ""; }

        //filter concerned right
        let searchedRight: any[] = this.rightsList.filter( (x: any) => (x.droit_code.toLowerCase().trim()) === (this.right.toLowerCase().trim()));

        if(searchedRight.length === 0){//no right found
          this.viewContainer.clear();
        }else{
          if(searchedRight[0].est_actif === true){ //has right
            this.viewContainer.createEmbeddedView(this.templateRef);
          }else{
            this.viewContainer.clear(); //right disabled
          }
        }
      }//end init

}
