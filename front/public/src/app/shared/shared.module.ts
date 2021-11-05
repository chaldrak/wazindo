import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgImageSliderModule } from 'ng-image-slider';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BarRatingModule } from 'ngx-bar-rating';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import {
  BreadcrumbComponent,
} from './components/breadcrumb/breadcrumb.component';
import {
  CategoriesComponent,
} from './components/categories/categories.component';
// Layout Box
import {
  LayoutBoxComponent,
} from './components/layout-box/layout-box.component';
// Components
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import {
  AgeVerificationComponent,
} from './components/modal/age-verification/age-verification.component';
import {
  CartModalComponent,
} from './components/modal/cart-modal/cart-modal.component';
import {
  CartVariationComponent,
} from './components/modal/cart-variation/cart-variation.component';
// Modals Components
import {
  NewsletterComponent,
} from './components/modal/newsletter/newsletter.component';
import {
  QuickViewComponent,
} from './components/modal/quick-view/quick-view.component';
import {
  SizeModalComponent,
} from './components/modal/size-modal/size-modal.component';
import {
  VideoModalComponent,
} from './components/modal/video-modal/video-modal.component';
import {
  CategoryBoxPopularComponent,
} from './components/product/category-box-popular/category-box-popular.component';
import {
  ProductBoxFiveComponent,
} from './components/product/product-box-five/product-box-five.component';
import {
  ProductBoxFourComponent,
} from './components/product/product-box-four/product-box-four.component';
import {
  ProductBoxOneComponent,
} from './components/product/product-box-one/product-box-one.component';
import {
  ProductBoxPopularComponent,
} from './components/product/product-box-popular/product-box-popular.component';
import {
  ProductBoxThreeComponent,
} from './components/product/product-box-three/product-box-three.component';
import {
  ProductBoxTwoComponent,
} from './components/product/product-box-two/product-box-two.component';
import {
  ProductBoxVerticalSliderComponent,
} from './components/product/product-box-vertical-slider/product-box-vertical-slider.component';
import {
  ProductBoxVerticalComponent,
} from './components/product/product-box-vertical/product-box-vertical.component';
import { SettingsComponent } from './components/settings/settings.component';
// Skeleton Loader Components
import {
  SkeletonProductBoxComponent,
} from './components/skeleton/skeleton-product-box/skeleton-product-box.component';
// Tap To Top
import {
  TapToTopComponent,
} from './components/tap-to-top/tap-to-top.component';
import {
  FooterEcolisComponent,
} from './footer/footer-ecolis/footer-ecolis.component';
import {
  FooterFourComponent,
} from './footer/footer-four/footer-four.component';
import { FooterOneComponent } from './footer/footer-one/footer-one.component';
import {
  FooterThreeComponent,
} from './footer/footer-three/footer-three.component';
import { FooterTwoComponent } from './footer/footer-two/footer-two.component';
import {
  FooterVoitureComponent,
} from './footer/footer-voiture/footer-voiture.component';
import {
  HeaderAccueilComponent,
} from './header/header-accueil/header-accueil.component';
// Header and Footer Components
import {
  HeaderEcolisComponent,
} from './header/header-ecolis/header-ecolis.component';
import {
  HeaderFourComponent,
} from './header/header-four/header-four.component';
import { HeaderOneComponent } from './header/header-one/header-one.component';
import {
  HeaderThreeComponent,
} from './header/header-three/header-three.component';
import { HeaderTwoComponent } from './header/header-two/header-two.component';
import {
  HeaderVoitureComponent,
} from './header/header-voiture/header-voiture.component';
// Pipes
import { DiscountPipe } from './pipes/discount.pipe';
import { FormatMoneyPipe } from './pipes/formatmoney.pipe';
import { LimitToPipe } from './pipes/limitto.pipe';

@NgModule({
  declarations: [
    HeaderEcolisComponent,
    FooterEcolisComponent,

    HeaderVoitureComponent,
    FooterVoitureComponent,
    HeaderOneComponent,
    HeaderAccueilComponent,
    FooterOneComponent,
    HeaderTwoComponent,
    FooterTwoComponent,
    HeaderThreeComponent,
    FooterThreeComponent,
    HeaderFourComponent,
    FooterFourComponent,
    LeftMenuComponent,
    MenuComponent,
    SettingsComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    ProductBoxOneComponent,
    ProductBoxTwoComponent,
    ProductBoxThreeComponent,
    ProductBoxFourComponent,
    ProductBoxFiveComponent,
    ProductBoxVerticalComponent,
    ProductBoxVerticalSliderComponent,
    NewsletterComponent,
    QuickViewComponent,
    CartModalComponent,
    CartVariationComponent,
    VideoModalComponent,
    SizeModalComponent,
    AgeVerificationComponent,
    SkeletonProductBoxComponent,
    LayoutBoxComponent,
    TapToTopComponent,
    DiscountPipe, LimitToPipe, FormatMoneyPipe,
    ProductBoxPopularComponent,
    CategoryBoxPopularComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule, ShareButtonsModule, ShareIconsModule,
    CarouselModule,
    BarRatingModule,
    LazyLoadImageModule.forRoot({
    }),
    NgxSkeletonLoaderModule,
    TranslateModule,
    NgImageSliderModule, PaginationModule,
    NgxUiLoaderModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule, ShareIconsModule,
    BarRatingModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    TranslateModule, PaginationModule,
    NgImageSliderModule,
    NgxUiLoaderModule, ShareButtonsModule,

    HeaderEcolisComponent,
    FooterEcolisComponent,

    HeaderVoitureComponent,
    FooterVoitureComponent,
    HeaderAccueilComponent,
    HeaderOneComponent,
    FooterOneComponent,
    HeaderTwoComponent,
    FooterTwoComponent,
    HeaderThreeComponent,
    FooterThreeComponent,
    HeaderFourComponent,
    FooterFourComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    ProductBoxOneComponent,
    ProductBoxTwoComponent,
    ProductBoxThreeComponent,
    ProductBoxFourComponent,
    ProductBoxFiveComponent,
    ProductBoxVerticalComponent,
    ProductBoxVerticalSliderComponent,
    NewsletterComponent,
    QuickViewComponent,
    CartModalComponent,
    CartVariationComponent,
    VideoModalComponent,
    SizeModalComponent,
    AgeVerificationComponent,
    SkeletonProductBoxComponent,
    LayoutBoxComponent,
    TapToTopComponent,
    DiscountPipe,
    LimitToPipe,
    FormatMoneyPipe,

    ProductBoxPopularComponent,
    CategoryBoxPopularComponent,

  ], providers: [
  ],


})
export class SharedModule { }
