import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultModule } from './layouts/default/default.module';
import { LoginAdminComponent } from './frontcomponents/login-admin/login-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FrontedModule } from './layouts/fronted/fronted.module';
import { LoginComponent } from './frontcomponents/login/login.component';
import { SugnupComponent } from './frontcomponents/sugnup/sugnup.component';
import { ConfirmComponent } from './frontcomponents/confirm/confirm.component';
import { ForgotPassComponent } from './frontcomponents/forgot-pass/forgot-pass.component';
import { ConfirmPassComponent } from './frontcomponents/confirm-pass/confirm-pass.component';
import { Step1Component } from './frontcomponents/step1/step1.component';
import { Step2Component } from './frontcomponents/step2/step2.component';
import { Step3Component } from './frontcomponents/step3/step3.component';
import { ThankyouComponent } from './frontcomponents/thankyou/thankyou.component';




@NgModule({
  declarations: [
    AppComponent,

    LoginAdminComponent,

    LoginComponent,

    SugnupComponent,

    ConfirmComponent,

    ForgotPassComponent,

    ConfirmPassComponent,

    Step1Component,

    Step2Component,

    Step3Component,

    ThankyouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FrontedModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
