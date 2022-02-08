import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmPassComponent } from './frontcomponents/confirm-pass/confirm-pass.component';
import { ConfirmComponent } from './frontcomponents/confirm/confirm.component';
import { ForgotPassComponent } from './frontcomponents/forgot-pass/forgot-pass.component';
import { HomepageComponent } from './frontcomponents/homepage/homepage.component';
import { LoginAdminComponent } from './frontcomponents/login-admin/login-admin.component';
import { LoginComponent } from './frontcomponents/login/login.component';
import { Step1Component } from './frontcomponents/step1/step1.component';
import { Step2Component } from './frontcomponents/step2/step2.component';
import { Step3Component } from './frontcomponents/step3/step3.component';
import { SugnupComponent } from './frontcomponents/sugnup/sugnup.component';
import { ThankyouComponent } from './frontcomponents/thankyou/thankyou.component';
import { AuthguardGuard } from './frontendcomponents/authguard.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { FrontedComponent } from './layouts/fronted/fronted.component';
import { AdminauthGuard } from './modules/guard/adminauth.guard';



const routes: Routes = [

  {
    path:"user",
    component:FrontedComponent,
    canActivate:[AuthguardGuard],
    children:[
      {
        path:"step2",
        component:Step2Component,
      },
      {
        path:"step3",
        component:Step3Component
      },
      {
        path:"step1",
        component:Step1Component
      },
      {
        path:"thankyou",
        component:ThankyouComponent
      }
    ]
  },
  {
    path:"signup",
    component:SugnupComponent
  },
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"confirm/:confirmationCode",
    component:ConfirmComponent
  },
  {
    path:"forgot-password",
    component:ForgotPassComponent
  },
  {
    path:"confirm-pass/:userid/:confirmCode",
    component:ConfirmPassComponent
  },
  {
    path:"adminlogin",
    component:LoginAdminComponent
  }
  // {
  //   path:"admin",
  //   component:DefaultComponent,
  //   canActivate:[AdminauthGuard],
  //   loadChildren: ()=>import("./modules/admin/admin.module").then(m=>m.AdminModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
