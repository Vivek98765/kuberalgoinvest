import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-frontedheader',
  templateUrl: './frontedheader.component.html',
  styleUrls: ['./frontedheader.component.css']
})
export class FrontedheaderComponent implements OnInit {

  constructor(public userService: UserService) { }

  userLoggedIn:any;
  ngOnInit(): void {
    this.userLoggedIn = this.userService.userLoggedIn();
    console.log(this.userLoggedIn);
  }

}
