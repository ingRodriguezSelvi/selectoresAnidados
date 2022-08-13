import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { CountriesSmall } from '../../interfaces/countries.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.css']
})
export class SelectPageComponent implements OnInit {

  constructor( private fb:FormBuilder,  private countriesServices:CountriesService ) { }

  myForm:FormGroup = this.fb.group({
    region  : ['',Validators.required],
    countrie: ['',Validators.required],
    limit   : ['',Validators.required]
  })

  regions   :  string[]         = [];
  countries :  CountriesSmall[] = []
  limits     : CountriesSmall[] = [];

  loading: boolean = false;

  ngOnInit(): void {

    this.regions = this.countriesServices.regions;


    //Change Region
    this.changeRegion();
    this.changeCountry();


  }

  save(){
    console.warn(this.myForm.value);
  }

  changeRegion(){
    this.myForm.get('region')?.valueChanges
    .pipe(
      tap( ( _ ) =>{

        this.myForm.get('countrie')?.reset('');
        this.loading = true;
      }),
      switchMap( region => this.countriesServices.getCountriesForRegion( region ))
      )
    .subscribe( countries =>{
      this.countries = countries
      this.loading = false;
    });
  }

  changeCountry(){
    this.myForm.get('countrie')?.valueChanges
    .pipe(
      tap( ( _ ) =>{

        this.loading = true;
        this.limits = [];
        this.myForm.get('limit')?.reset('');
      }),
      switchMap( code => this.countriesServices.getCountryForCode(code) ),
      switchMap( country => this.countriesServices.getCountrysForLimits(country?.borders!))
    )
    .subscribe( paises =>{
      console.log(paises)
     // country?.length > 0 ? this.limits = country[0].borders : []
      this.limits = paises;
      this.loading = false;
    });
  }

}
