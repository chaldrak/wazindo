import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { AboutUsComponent } from './about-us/about-us.component';
import { CartComponent } from './account/cart/cart.component';
import { CheckoutComponent } from './account/checkout/checkout.component';
import { ContactComponent } from './account/contact/contact.component';
import { DashboardComponent } from './account/dashboard/dashboard.component';
import {
  ForgetPasswordComponent,
} from './account/forget-password/forget-password.component';
import { LoginComponent } from './account/login/login.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RegisterComponent } from './account/register/register.component';
import { WishlistComponent } from './account/wishlist/wishlist.component';
import {
  BlogDetailsComponent,
} from './blog/blog-details/blog-details.component';
import {
  BlogLeftSidebarComponent,
} from './blog/blog-left-sidebar/blog-left-sidebar.component';
import {
  BlogNoSidebarComponent,
} from './blog/blog-no-sidebar/blog-no-sidebar.component';
import {
  BlogRightSidebarComponent,
} from './blog/blog-right-sidebar/blog-right-sidebar.component';
import { CollectionComponent } from './collection/collection.component';
import { ErrorComponent } from './error/error.component';
import { FaqComponent } from './faq/faq.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'wishlist',
    component: WishlistComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forget/password',
    component: ForgetPasswordComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
 
  {
    path: 'order/success',
    component: OrderSuccessComponent
  },

  {
    path: 'collection',
    component: CollectionComponent
  },

  {
    path: '404',
    component: ErrorComponent
  },
  
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'blog/left/sidebar',
    component: BlogLeftSidebarComponent
  },
  {
    path: 'blog/right/sidebar',
    component: BlogRightSidebarComponent
  },
  {
    path: 'blog/no/sidebar',
    component: BlogNoSidebarComponent
  },
  {
    path: 'blog/details',
    component: BlogDetailsComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
