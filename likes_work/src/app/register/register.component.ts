import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserServiceService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User();
  statusMessage: string;

  constructor(private router: Router, private _userService:UserServiceService) { }

  ngOnInit() {
  }

  addUser():void{
    this._userService.addUser(this.user)
    .subscribe((response)=>{console.log(response);
    },
    (error)=>{
      console.log(error);
      this.statusMessage = "Problem with service. Please try again later!";
      this.router.navigate(['/Login']);
    });
}
}
