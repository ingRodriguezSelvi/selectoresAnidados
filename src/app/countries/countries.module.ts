import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectPageComponent } from './pages/select-page/select-page.component';
import { CountriesRoutingModule } from './countries-routing.module';




@NgModule({
  declarations: [
    SelectPageComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ReactiveFormsModule
  ]
})
export class CountriesModule { }
