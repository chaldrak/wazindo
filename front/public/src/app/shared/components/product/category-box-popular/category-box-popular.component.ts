import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { Produit } from 'src/app/shared/classes/produit';
import {
  LocalStorageService,
} from 'src/app/shared/services/localstorage.service';

import { ProductService } from '../../../services/product.service';
import {
  CartModalComponent,
} from '../../modal/cart-modal/cart-modal.component';
import {
  QuickViewComponent,
} from '../../modal/quick-view/quick-view.component';

@Component({
  selector: 'app-category-box-popular',
  templateUrl: './category-box-popular.component.html',
  styleUrls: ['./category-box-popular.component.scss']
})
export class CategoryBoxPopularComponent implements OnInit {

  @Input() product: any;
  @Input() currency: any = this.productService.Currency; // Default Currency
  @Input() cartModal: boolean = false; // Default False
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;
  public ImageSrc : string

  constructor(private productService: ProductService,private localStorageService: LocalStorageService, private router: Router) { 
  }

  ngOnInit(): void {
    
  }

  addToCart(product: any) {
    this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }


  //showDetails
  showDetails(prod: Produit){

    this.router.navigate(["/annonces/autos/details", prod.code ]);

  }//end showDetails

  //like this car
  likeThisCar(prod: Produit){
    alert("Vous aimez cette voiture");

  }//end likeThisCar

}
