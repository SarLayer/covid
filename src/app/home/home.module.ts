import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {CountryInformationComponent} from "./components/country-information/country-information.component";
import {DemoMaterialModule} from "../material-module";
import {HighchartsChartModule} from "highcharts-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: '', component: HomeComponent}
]

@NgModule({
  imports: [CommonModule,
    FormsModule,
    DemoMaterialModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    CountryInformationComponent
  ],
  exports: [
    HomeComponent,
    CountryInformationComponent
  ]
})
export class HomeModule {
  static entry = HomeComponent;
}
