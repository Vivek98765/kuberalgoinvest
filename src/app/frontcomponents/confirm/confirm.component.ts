import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {


  confirmCode:string;
  constructor(private route:ActivatedRoute, private userService:UserService) { }

  ngOnInit(): void {
    this.confirmCode = this.route.snapshot.paramMap.get('confirmationCode');
      this.userService.userConfirm('/auth/confirm/' + this.confirmCode )
    .subscribe(res => {
     console.log(res);
    },
    err => {
      console.log(err);
    })

  }

}
