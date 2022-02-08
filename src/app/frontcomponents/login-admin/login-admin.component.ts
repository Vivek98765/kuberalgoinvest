import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  adminlogfrom = new FormGroup({
    email: new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)
  });

  constructor(private userService:UserService, private  router:Router) { }

  ngOnInit(): void {
  }
  
  adminLogin(){
    if(this.adminlogfrom.valid){
        this.userService.adminLogin(this.adminlogfrom.value).subscribe(res=>{
          localStorage.setItem("Admintoken",res.token);
          this.adminlogfrom.reset();
          this.router.navigate(['/admin']);
        },
        err=>{
          console.log(err);
        });
    }
  }
}
