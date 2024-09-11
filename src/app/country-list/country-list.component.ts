import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CountryService, Country } from '../country.service';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  filterText: string = '';
  selectedRegion: string = '';

  constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(
      (data: Country[]) => {
        this.countries = data;
        this.filteredCountries = data;
      }
    );
  }

  filterCountries(): void {
    this.filteredCountries = this.countries.filter(country => 
      country.name.toLowerCase().includes(this.filterText.toLowerCase()) &&
      (this.selectedRegion === '' || country.region === this.selectedRegion)
    );
  }

  onRegionChange(region: string): void {
    this.selectedRegion = region;
    this.filterCountries();
  }
}