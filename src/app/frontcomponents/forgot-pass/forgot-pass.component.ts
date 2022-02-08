import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  modelform=new FormGroup({
    email:new FormControl("",Validators.required)
  });

  forgot(){
    console.log(this.modelform.value)
    this.userService.userForgotPass(this.modelform.value, '/auth/','password-reset').subscribe(res => {
      console.log(res);
      console.log('Sent a link');
    },
    err => {
      console.log(err);
    })
  }

}
