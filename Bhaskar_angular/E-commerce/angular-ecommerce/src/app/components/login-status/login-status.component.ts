import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated:boolean=false;
  userName:string='';
  sessionStorage:Storage=sessionStorage;

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
  private oktaAuthService :OktaAuthStateService) { }

  ngOnInit(): void {

    this.oktaAuthService.authState$.subscribe( response =>{
      this.isAuthenticated=response.isAuthenticated!;
      this.getUserDetails();
    })
  }
  getUserDetails() {
    if(this.isAuthenticated){
      this.oktaAuth.getUser().then(res=>{
        this.userName=res.name!;
        this.sessionStorage.setItem("email",JSON.stringify(res.email));
      })
    }
  }

  logout(){
    this.oktaAuth.signOut();
  }

}
