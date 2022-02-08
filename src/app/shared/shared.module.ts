import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FrontedheaderComponent } from './components/frontedheader/frontedheader.component';
import { FrontedfooterComponent } from './components/frontedfooter/frontedfooter.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    FrontedheaderComponent,
    FrontedfooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    FrontedheaderComponent,
    FrontedfooterComponent
  ]
})
export class SharedModule { }
