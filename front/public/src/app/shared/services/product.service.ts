import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  map,
  startWith,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Product } from '../classes/product';
import { Produit } from '../classes/produit';
import { AppService } from './app.service';

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public Currency = { name: 'EUROS', currency: 'EUR', price: 1 } // Default Currency
  public OpenCart: boolean = false;
  public httpOptions: any = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  public Products

  constructor(private http: HttpClient,private appService: AppService,
    private toastrService: ToastrService) { }

  /*
    ---------------------------------------------
    ---------------  Product  -------------------
    ---------------------------------------------
  */

  // Product
  private get products(): Observable<Product[]> {
    this.Products = this.http.get<Product[]>('assets/data/products.json').pipe(map(data => data));
    this.Products.subscribe(next => { localStorage['products'] = JSON.stringify(next) });
    return this.Products = this.Products.pipe(startWith(JSON.parse(localStorage['products'] || '[]')));
  }

  // Get Products
  public get getProducts(): Observable<Product[]> {
    return this.products;
  }

  // Get Products By Slug
  public getProductBySlug(slug: string): Observable<Product> {
    return this.products.pipe(map(items => { 
      return items.find((item: any) => { 
        return item.title.replace(' ', '-') === slug; 
      }); 
    }));
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure or something like that
      //console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //console.log(`${operation} failed: ${error.message}`);

      //show error
      //let errorMsg: string = "Une erreur est survenue lors de cette opération. Veuillez vérifier votre connexion et réessayer";
      //this.toastr.error(errorMsg, "Erreur", {positionClass: 'toast-top-center'});

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  /*
    ---------------------------------------------
    ---------------  Wish List  -----------------
    ---------------------------------------------
  */

  // Get Wishlist Items
  public get wishlistItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.wishlist);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Wishlist
  public addToWishlist(product): any {
    const wishlistItem = state.wishlist.find(item => item.id === product.id)
    if (!wishlistItem) {
      state.wishlist.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in wishlist.');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: Product): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  /*
    ---------------------------------------------
    -------------  Compare Product  -------------
    ---------------------------------------------
  */

  // Get Compare Items
  public get compareItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.compare);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Compare
  public addToCompare(product): any {
    const compareItem = state.compare.find(item => item.id === product.id)
    if (!compareItem) {
      state.compare.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in compare.');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: Product): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  /*
    ---------------------------------------------
    -----------------  Cart  --------------------
    ---------------------------------------------
  */

  // Get Cart Items
  public get cartItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Cart
  public addToCart(product): any {
    const cartItem = state.cart.find(item => item.id === product.id);
    const qty = product.quantity ? product.quantity : 1;
    const items = cartItem ? cartItem : product;
    const stock = this.calculateStockCounts(items, qty);
    
    if(!stock) return false

    if (cartItem) {
        cartItem.quantity += qty    
    } else {
      state.cart.push({
        ...product,
        quantity: qty
      })
    }

    this.OpenCart = true; // If we use cart variation modal
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true;
  }

  // Update Cart Quantity
  public updateCartQuantity(product: Product, quantity: number): Product | boolean {
    return state.cart.find((items, index) => {
      if (items.id === product.id) {
        const qty = state.cart[index].quantity + quantity
        const stock = this.calculateStockCounts(state.cart[index], quantity)
        if (qty !== 0 && stock) {
          state.cart[index].quantity = qty
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    })
  }

    // Calculate Stock Counts
  public calculateStockCounts(product, quantity) {
    const qty = product.quantity + quantity
    const stock = product.stock
    if (stock < qty || stock == 0) {
      this.toastrService.error('You can not add more items than available. In stock '+ stock +' items.');
      return false
    }
    return true
  }

  // Remove Cart items
  public removeCartItem(product: Product): any {
    const index = state.cart.indexOf(product);
    state.cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true
  }

  // Total amount 
  public cartTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((product: Product[]) => {
      return product.reduce((prev, curr: Product) => {
        let price = curr.price;
        if(curr.discount) {
          price = curr.price - (curr.price * curr.discount / 100)
        }
        return (prev + price * curr.quantity) * this.Currency.price;
      }, 0);
    }));
  }

  /*
    ---------------------------------------------
    ------------  Filter Product  ---------------
    ---------------------------------------------
  */

  // Get Product Filter
  public filterProducts(filter: any): Observable<Product[]> {
    return this.products.pipe(map(product => 
      product.filter((item: Product) => {
        if (!filter.length) return true
        const Tags = filter.some((prev) => { // Match Tags
          if (item.tags) {
            if (item.tags.includes(prev)) {
              return prev
            }
          }
        })
        return Tags
      })
    ));
  }

  // Sorting Filter
  public sortProducts(products: Product[], payload: string): any {

    if(payload === 'ascending') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'a-z') {
      return products.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else if (a.title > b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'z-a') {
      return products.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else if (a.title < b.title) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    } 
  }

    // Sorting Filter
    public sortProductsR(products: Produit[], payload: string): any {

      if(payload === 'ascending') {
        return products.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
            return 1;
          }
          return 0;
        })
      } else if (payload === 'a-z') {
        return products.sort((a, b) => {
          if (a.titre < b.titre) {
            return -1;
          } else if (a.titre > b.titre) {
            return 1;
          }
          return 0;
        })
      } else if (payload === 'z-a') {
        return products.sort((a, b) => {
          if (a.titre > b.titre) {
            return -1;
          } else if (a.titre < b.titre) {
            return 1;
          }
          return 0;
        })
      } else if (payload === 'low') {
        return products.sort((a, b) => {
          if (a.prix < b.prix) {
            return -1;
          } else if (a.prix > b.prix) {
            return 1;
          }
          return 0;
        })
      } else if (payload === 'high') {
        return products.sort((a, b) => {
          if (a.prix > b.prix) {
            return -1;
          } else if (a.prix < b.prix) {
            return 1;
          }
          return 0;
        })
      }else if(payload === environment.STR_LIB_AVENDRE) {
          return products.sort((a, b) => {
            if (a.prix > b.prix) {
              return -1;
            } else if (a.prix < b.prix) {
              return 1;
            }
            return 0;
          })
        } else if(payload === environment.STR_LIB_NOUVEAUTE) {
          return products.sort((a, b) => {
            if (a.id > b.id) {
              return 1;
            } else if (a.id < b.id) {
              return -1;
            }
            return 0;
          })
        } 
    }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) { 
      currentPage = 1; 
    } else if (currentPage > totalPages) { 
      currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if(currentPage < paginateRange - 1){
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage =  currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }







  ///////////////////////////////////////////////////////////////////////ws liste de produits/////////////////////////////////////////////////////////////

     //search produits
     searchProduits(filter: any) : Observable<any> {

      return this.http.post<any[]>(`${environment.apiUrl}operations/searchproducts`, filter, this.appService.httpOptions)
        .pipe(
          catchError(this.handleError<any[]>(``))
        )
    }//fin searchProduits  

     //recuperer produits par id
     getProduitById(idProduit: number) : Observable<any> {

      return this.http.get<any[]>(`${environment.apiUrl}operations/product/${idProduit}`)
        .pipe(
          catchError(this.handleError<any[]>(``))
        )
    }//fin getListProduits 


     //recuperer images par id
     getListImage(produitId: number) : Observable<any> {
      return this.http.get<any[]>(`${environment.apiUrl}operations/imagelist/${produitId}`)
        .pipe(
          catchError(this.handleError<any[]>(``))
        )
    }//fin getListImage 

     //liste marques
     getListMarques() : Observable<any> {

      return this.http.get<any[]>(`${environment.apiUrl}operations/marques`)
        .pipe(
          catchError(this.handleError<any[]>(``))
        )
    }//fin getListMarques

   //liste categories
   getListCategories() : Observable<any> {

    return this.http.get<any[]>(`${environment.apiUrl}operations/categories`)
      .pipe(
        catchError(this.handleError<any[]>(``))
      )
  }//fin getListCategories
  
  
    //liste produits par categorie
    getListProductsByCategorie(category: string) : Observable<any> {

      return this.http.get<any[]>(`${environment.apiUrl}operations/produits/${category}`)
        .pipe(
          catchError(this.handleError<any[]>(``))
        )
    }//fin getListProductsByCategorie 


      //liste produits par filtre
      getListProductsByFilter(filter: any) : Observable<any> {

        return this.http.get<any[]>(`${environment.apiUrl}operations/produitsbyfiltre`) //, item, ""
          .pipe(
            catchError(this.handleError<any[]>(``))
          )
      }//fin getListProductsByFilter 

   //liste top x produits
   getListTopXProduits() : Observable<any> {

    return this.http.get<any[]>(`${environment.apiUrl}operations/produits/topx`)
      .pipe(
        catchError(this.handleError<any[]>(``))
      )
  }//fin getListTopXProduits

    //liste popular produits
    getListAleaXProduits() : Observable<any> {

    return this.http.get<any[]>(`${environment.apiUrl}operations/produits/aleax`)
      .pipe(
        catchError(this.handleError<any[]>(``))
      )
  }//fin getListAleaXProduits

    //liste popular produits
    getListPopularProduits() : Observable<any> {

    return this.http.get<any[]>(`${environment.apiUrl}operations/produits/popular`)
      .pipe(
        catchError(this.handleError<any[]>(``))
      )
  }//fin getListPopularProduits


    //search suivi data
     searchSuiviData(codeSuivi: string) : Observable<any> {

      return this.http.get<any[]>(`${environment.apiUrl}operations/command/suivi/${codeSuivi}`)
        .pipe(
          catchError(this.handleError<any[]>(``))
        )
    }//fin searchSuiviData
}
