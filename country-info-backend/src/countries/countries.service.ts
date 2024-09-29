import { Injectable, Inject } from '@nestjs/common';

import { IEnvironmentVariables } from '../config/environment/environment.interface';
import axios, { AxiosRequestConfig } from 'axios';
import {
  AvailableCountry,
  BorderCountry,
  CountryInfo,
  HttpMethod,
  PopulationData,
} from './model/interfaces';

@Injectable()
export class CountriesService {
  constructor(
    @Inject('IEnvironmentVariables')
    private readonly envConfigService: IEnvironmentVariables,
  ) {}

  private readonly nagerApiBase = this.envConfigService.getNagerApiUrl();
  private readonly countriesNowApiBase =
    this.envConfigService.getCountriesNowApiUrl();

  private async fetchData(
    url: string,
    method: HttpMethod = HttpMethod.GET,
    payload?: any,
  ): Promise<any> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        data: payload,
      };
      const response = await axios(config);
      return response.data as any;
    } catch (error: any) {
      console.error(`Error fetching data from ${url}:`, error.message);
      throw new Error(`Failed to retrieve data from ${url}`);
    }
  }

  async getAvailableCountries(): Promise<AvailableCountry[]> {
    const url = `${this.nagerApiBase}/AvailableCountries`;
    return this.fetchData(url);
  }

  async getBorderCountries(countryCode: string): Promise<BorderCountry[]> {
    const url = `${this.nagerApiBase}/CountryInfo/${countryCode}`;
    const data = await this.fetchData(url);
    if (!data || !data.borders) {
      console.error('Invalid data format or empty data');
      return [];
    }
    return data.borders as BorderCountry[];
  }

  async getCountryFlag(countryCode: string): Promise<string | undefined> {
    const url = `${this.countriesNowApiBase}/flag/images`;
    const payload = { iso2: countryCode.toUpperCase() };
    const data = await this.fetchData(url, HttpMethod.POST, payload);

    if (!data || !data.data) {
      console.error('Invalid data format or empty data');
      return undefined;
    }

    const flagData = data.data.flag as string;

    return flagData;
  }

  async getCountryPopulation(
    countryCode: string,
  ): Promise<PopulationData | null> {
    const url = `${this.countriesNowApiBase}/population`;
    const getCountryISO3 = require('country-iso-2-to-3');
    const iso3Code = getCountryISO3(countryCode.toUpperCase());

    if (!iso3Code) {
      console.error(`Invalid ISO2 code: ${countryCode}`);
      return null;
    }

    const payload = { iso3: iso3Code };
    const data = await this.fetchData(url, HttpMethod.POST, payload);
    if (!data || !data.data) {
      console.error('Invalid data');
      return null;
    }

    const countryData: PopulationData = data.data.populationCounts;

    return countryData;
  }

  getCountryName(countryCode: string): string {
    const country = require('i18n-iso-countries');
    return country.getName(countryCode, 'en');
  }

  async getCountryInfo(countryCode: string): Promise<CountryInfo> {
    const [borderCountries, countryFlag, countryPopulation] = await Promise.all(
      [
        this.getBorderCountries(countryCode),
        this.getCountryFlag(countryCode),
        this.getCountryPopulation(countryCode),
      ],
    );

    return {
      countryName: this.getCountryName(countryCode),
      borderCountries,
      populationData: countryPopulation,
      flagUrl: countryFlag,
    };
  }
}
