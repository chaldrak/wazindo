import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { Resolver } from '../shared/services/resolver.service';
import {
  BundleProductComponent,
} from './product/bundle-product/bundle-product.component';
import { FourImageComponent } from './product/four-image/four-image.component';
import {
  ImageOutsideComponent,
} from './product/image-outside/image-outside.component';
import {
  ProductLeftSidebarComponent,
} from './product/sidebar/product-left-sidebar/product-left-sidebar.component';
import {
  ProductNoSidebarComponent,
} from './product/sidebar/product-no-sidebar/product-no-sidebar.component';
import {
  ProductRightSidebarComponent,
} from './product/sidebar/product-right-sidebar/product-right-sidebar.component';
import {
  ThreeColumnComponent,
} from './product/three-column/three-column.component';

const routes: Routes = [
  {
    path: 'product/left/sidebar/:slug',
    component: ProductLeftSidebarComponent,
    resolve: {
      data: Resolver
    }
  },
  {
    path: 'product/right/sidebar/:slug',
    component: ProductRightSidebarComponent,
    resolve: {
      data: Resolver
    }
  },
  {
    path: 'product/no/sidebar/:slug',
    component: ProductNoSidebarComponent,
    resolve: {
      data: Resolver
    }
  },
  {
    path: 'product/three/column/:slug',
    component: ThreeColumnComponent,
    resolve: {
      data: Resolver
    }
  },
  {
    path: 'product/four/image/:slug',
    component: FourImageComponent,
    resolve: {
      data: Resolver
    }
  },
  {
    path: 'product/bundle/:slug',
    component: BundleProductComponent,
    resolve: {
      data: Resolver
    }
  },
  {
    path: 'product/image/outside/:slug',
    component: ImageOutsideComponent,
    resolve: {
      data: Resolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
