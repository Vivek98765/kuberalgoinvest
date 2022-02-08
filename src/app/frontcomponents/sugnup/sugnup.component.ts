import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-sugnup',
  templateUrl: './sugnup.component.html',
  styleUrls: ['./sugnup.component.css']
})
export class SugnupComponent implements OnInit {

  formdetails:any;
  show = false;
  submitted = false;
  message:string;
  constructor(private UserService: UserService, private router: Router) {   }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value;
    if (confirmPass != "") {
      return pass === confirmPass ? null : { notSame: true }
    }
  }
  ngOnInit(): void {
  }
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
    email:new FormControl("",[Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
    confirm_password: new FormControl("", Validators.required),

  }, { validators: this.checkPasswords });
  get f() { return this.modelform.controls; }
  addedit(){
    //this.submitted = true;
    //console.log(this.modelform.value);
    this.UserService.OnPostMethod(this.modelform.value, "/auth/", "signup").subscribe(res => {
      if (res) {
        //this.router.navigate(['/login']);
        this.submitted = true;
        //console.log(res);
        this.message = res.message;
        
      }
    },
    err => {
      console.log(err);
    });
  }

}
