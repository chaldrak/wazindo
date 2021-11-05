import {
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

import { Produit } from 'src/app/shared/classes/produit';

import { ProductService } from '../../../services/product.service';
import {
  CartModalComponent,
} from '../../modal/cart-modal/cart-modal.component';
import {
  QuickViewComponent,
} from '../../modal/quick-view/quick-view.component';

@Component({
  selector: 'app-product-box-popular',
  templateUrl: './product-box-popular.component.html',
  styleUrls: ['./product-box-popular.component.scss']
})
export class ProductBoxPopularComponent implements OnInit {

  @Input() product: Produit;
  @Input() currency: any = this.productService.Currency; // Default Currency
  @Input() cartModal: boolean = false; // Default False
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;
  public ImageSrc : string

  constructor(private productService: ProductService, private router: Router) { 
  }

  ngOnInit(): void {

    //console.log(this.product);
    
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
