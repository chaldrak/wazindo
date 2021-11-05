import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { ToastrModule } from 'ngx-toastr';



@NgModule({
  imports: [

    CommonModule,
    RouterModule,
    FormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center', closeButton: true }),
    NgxSkeletonLoaderModule,
   

  ],
  declarations: [

  ],
  entryComponents: [
  ],
  exports: [

  ]
})
export class SharedModule { }
