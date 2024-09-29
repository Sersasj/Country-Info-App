export interface AvailableCountry {
  name: string;
  countryCode: string;
}

export interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[] | null;
}

export interface PopulationCount {
  year: number;
  value: number;
}

export interface PopulationData {
  populationCounts: PopulationCount[];
}

export interface Flag {
  iso2: string;
  flag: string;
}

export interface CountryInfo {
  countryName: string;
  borderCountries: BorderCountry[];
  populationData: PopulationData | null;
  flagUrl?: string;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
