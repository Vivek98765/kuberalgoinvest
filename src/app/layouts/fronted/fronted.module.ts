import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontedComponent } from './fronted.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomepageComponent } from 'src/app/frontcomponents/homepage/homepage.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    FrontedComponent,
    HomepageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class FrontedModule { }
