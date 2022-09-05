import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuthService} from "./providers/auth.service";
import {AppRoutingModule} from "./app-routing.module";
import {CovidService} from './shared/service/covid.service';
import {HttpClientModule} from "@angular/common/http";
import {HomeGuard} from "./shared/guard/home.guard";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule],
  providers: [
    AuthService,
    HomeGuard,
    CovidService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
