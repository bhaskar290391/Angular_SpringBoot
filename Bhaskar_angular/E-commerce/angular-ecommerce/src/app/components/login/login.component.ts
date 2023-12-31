import { Component, Inject, OnInit } from '@angular/core';

import myAppConfig, {} from '../../config/my-app-config'
import { OktaAuth } from '@okta/okta-auth-js';
import { OKTA_AUTH } from '@okta/okta-angular';
import OktaSignIn from '@okta/okta-signin-widget'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignIn:any;
  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){ 

    this.oktaSignIn=new OktaSignIn({
      logo:"/assest/images/logo.png",
      baseUrl:myAppConfig.oidc.issuer.split("/oauth2")[0],
      clientId:myAppConfig.oidc.clientId,
      redirectUri:myAppConfig.oidc.redirectUri,
      authParams:{
        pkce:true,
        issuer:myAppConfig.oidc.issuer,
        scopes:myAppConfig.oidc.scope
      }

    })
  }

  ngOnInit(): void {

    this.oktaSignIn.remove();

    this.oktaSignIn.renderEl({
      el:'#okta-sign-in-widget'},
      (Response:any)=>{
        if(Response.status== "SUCCESS"){
          this.oktaAuth.signInWithRedirect()
        }
      },
      (error:any) =>{
        throw error;
      }
    );
  }

}
