import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GalleryModule } from '@ks89/angular-modal-gallery';

import { SharedModule } from '../shared/shared.module';
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
// Pages Components
import { WishlistComponent } from './account/wishlist/wishlist.component';
import {
  BlogDetailsComponent,
} from './blog/blog-details/blog-details.component';
// Blog Components
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
import { PagesRoutingModule } from './pages-routing.module';
import { SearchComponent } from './search/search.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    WishlistComponent,
    CartComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ProfileComponent,
    ContactComponent,
    CheckoutComponent,
    AboutUsComponent,
    SearchComponent,
    OrderSuccessComponent,
    CollectionComponent,
    ErrorComponent,
    FaqComponent,
    BlogLeftSidebarComponent,
    BlogRightSidebarComponent,
    BlogNoSidebarComponent,
    BlogDetailsComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    GalleryModule.forRoot(),
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
