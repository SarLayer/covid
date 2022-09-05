import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: AuthComponent}
]

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes)],
  declarations: [
    AuthComponent
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule {
  static entry = AuthComponent;
}
