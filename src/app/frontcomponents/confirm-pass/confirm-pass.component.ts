import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-confirm-pass',
  templateUrl: './confirm-pass.component.html',
  styles: [
  ]
})
export class ConfirmPassComponent implements OnInit {

  public userId: string;
  public confirmCode: string;
  constructor(private route:ActivatedRoute, private userService : UserService) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.confirmCode = this.route.snapshot.paramMap.get('confirmCode');
  }

  modelform=new FormGroup({
    password:new FormControl("",Validators.required)
  });

  changePass(){
    console.log(this.modelform.value);
    this.userService.userChangePass(this.modelform.value, '/auth/',"password-reset/" + this.userId + '/' + this.confirmCode)
    .subscribe(res => {
     console.log(res);
    },
    err => {
      console.log(err);
    })
  }

}
