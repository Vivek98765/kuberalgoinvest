import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthGuard implements CanActivate {

  constructor(private userService:UserService,private router:Router){}
  canActivate():boolean {
    if (this.userService.adminloggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
  
}
