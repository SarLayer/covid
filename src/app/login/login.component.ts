import {Component} from '@angular/core';
import {gatekeeperConfig} from "../gatekeeper.config";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  public githubUrl: string = 'https://github.com/login/oauth/authorize?client_id=' + gatekeeperConfig.development.client_id + '&scope=user&redirect_uri=' + gatekeeperConfig.development.redirect_uri;

  public navigate(): void {
    window.location.href = this.githubUrl;
  }
}
