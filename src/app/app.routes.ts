import { Routes } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

export const routes: Routes = [
    { path:'',component:CountryListComponent},
    { path:'country/:name',component:CountryDetailComponent},
    {path:'**',redirectTo:''}
];
