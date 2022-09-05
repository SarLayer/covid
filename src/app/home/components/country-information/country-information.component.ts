import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {combineLatestWith, map, startWith, takeUntil, tap} from "rxjs/operators";
import {CovidService} from "../../../shared/service/covid.service";
import {AllInformation} from "../../../model/all-information.model";
import * as Highcharts from 'highcharts';
import {AutoUnsubscribe} from "../../../shared/core/auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-country-information',
  templateUrl: './country-information.component.html',
  styleUrls: ['./country-information.component.less']
})
export class CountryInformationComponent implements OnInit, OnDestroy {
  public myControl = new FormControl('');
  public myControlCity = new FormControl('');
  @Input()
  public options: string[];
  public filteredOptions: Observable<string[]>;
  public filteredOptionsCity: Observable<string[]>;
  public cities: string[];
  public selectedCity: any;
  public selectedCountry: any;
  public percentOfVaccinated: string;
  public vaccination: { [p: string]: { [p: string]: AllInformation } };
  public highcharts = Highcharts;
  public chartOptions: any = {
    chart: {
      type: "spline"
    },
    title: {
      text: "Death cases"
    },
    subtitle: {
      text: ""
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: ""
      }
    },
    tooltip: {
      valueSuffix: ""
    },
    series: [{
      name: 'People',
      type: "spline",
      data: []
    }]
  }
  public show: boolean;
  public showConfirmed: boolean;
  public chartOptionsConfirmed: any = {
    chart: {
      type: "spline"
    },
    title: {
      text: "Confirmed cases"
    },
    subtitle: {
      text: ""
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: ""
      }
    },
    tooltip: {
      valueSuffix: ""
    },
    series: [{
      name: 'People',
      type: "spline",
      data: []
    }]
  }
  private unsubscribeStream$: Subject<void> = new Subject<void>();
  private countryInformation: { [p: string]: { [p: string]: AllInformation } };
  private selectedCityVaccination: any;

  constructor(private covidService: CovidService,
              private cdr: ChangeDetectorRef) {
  }

  public ngOnDestroy(): void {
  }

  public ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', this.options)),
    );
  }

  public selectCountry(option: string): void {
    this.selectedCity = null;
    this.cities = [];
    this.myControlCity = new FormControl('');
    this.filteredOptionsCity = of([]);
    this.selectedCountry = null;
    this.covidService.getHistoryDeathDataByCountry(option)
      .pipe(
        tap((inf) => {
          // @ts-ignore
          Object.keys(inf["All"].dates).reverse().forEach((date: string) => {
            this.chartOptions.xAxis.categories.push(date);
            // @ts-ignore
            this.chartOptions.series[0].data.push(inf["All"].dates[date])
          });
          this.cdr.detectChanges();
          this.show = true;
        }),
        takeUntil(this.unsubscribeStream$)
      )
      .subscribe()

    this.covidService.getHistoryConfirmedDataByCountry(option)
      .pipe(tap((inf) => {
          // @ts-ignore
          Object.keys(inf["All"].dates).reverse().forEach((date: string) => {
            this.chartOptionsConfirmed.xAxis.categories.push(date);
            // @ts-ignore
            this.chartOptionsConfirmed.series[0].data.push(inf["All"].dates[date])
          });
          this.cdr.detectChanges();
          this.showConfirmed = true;
        }),
        takeUntil(this.unsubscribeStream$))
      .subscribe()
    this.covidService.getLiveCasesDataByCountry(option).pipe(
      combineLatestWith(this.covidService.getVaccinesDataByCountry(option)),
      tap(([liveCases, vaccination]: [{ [country: string]: { [city: string]: AllInformation } }, { [country: string]: { [city: string]: AllInformation } }]) => {
        this.countryInformation = liveCases;
        this.vaccination = vaccination;
        this.cities = Object.keys(liveCases);
        this.selectedCountry = this.countryInformation["All"];
        this.selectedCityVaccination = this.vaccination["All"];
        this.percentOfVaccinated = ((this.selectedCityVaccination.people_vaccinated / this.selectedCountry.population) * 100).toFixed(2);
        this.filteredOptionsCity = this.myControlCity.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', this.cities)),
        );
        this.cdr.detectChanges();
      }),
      takeUntil(this.unsubscribeStream$)
    ).subscribe()
  }

  public selectCity(optionCity: any): void {
    this.selectedCity = this.countryInformation[optionCity];
  }

  private _filter(value: string, entry: string[]): string[] {
    const filterValue = value.toLowerCase();
    return entry.filter(option => option.toLowerCase().includes(filterValue));
  }
}
