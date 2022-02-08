import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private UserService: UserService, private router: Router) { }
  show = false
  ngOnInit(): void {
    var userdetails = JSON.parse(localStorage.getItem('userDetails'));
  }
  get f() { return this.modelform.controls; }
  passRequirement = {
    passwordMinLowerCase: 1,
    passwordMinNumber: 1,
    passwordMinSymbol: 1,
    passwordMinUpperCase: 1,
    passwordMinCharacters: 6
  };
  pattern = [
    `(?=([^a-z]*[a-z])\{${this.passRequirement.passwordMinLowerCase},\})`,
    `(?=([^A-Z]*[A-Z])\{${this.passRequirement.passwordMinUpperCase},\})`,
    `(?=([^0-9]*[0-9])\{${this.passRequirement.passwordMinNumber},\})`,
    `(?=(\.\*[\$\@\$\!\%\*\?\&])\{${this.passRequirement.passwordMinSymbol},\})`,
    `[A-Za-z\\d\$\@\$\!\%\*\?\&\.]{${
      this.passRequirement.passwordMinCharacters
    },}`
  ]
    .map(item => item.toString())
    .join("");
  modelform=new FormGroup({
    username:new FormControl("",Validators.required),
    password:new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
  });

  login(){
        this.UserService.userLogin(this.modelform.value, "/auth/", "signin").subscribe(res => {
         if (res.status == "Active" ) {
            this.UserService.setToken(res['token']);
            this.UserService.setuserDetailsToken(JSON.stringify(res))
            //localStorage.setItem("userDetails",JSON.stringify(res.data));
            //console.log(res);
            if(res.activeStep == 1){
              this.router.navigate(['/user/step2']);
            }
            else if(res.activeStep == 2){
              this.router.navigate(['/user/step3']);
            }
            else {
              this.router.navigate(['/user/step1']);
            } 

          }
          else
            {
              this.router.navigate(['/login']);
            }  
        },
        err => {
          console.log(err);
        });
  }

}
