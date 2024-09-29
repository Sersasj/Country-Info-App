export type Country = {
  countryCode: string;
  name: string;
};

export type BorderCountry = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[] | null;
};

export type PopulationData = {
  year: number;
  value: number;
};

export type CountryInfo = {
  countryName: string;
  borderCountries: BorderCountry[];
  populationData: PopulationData[];
  flagUrl: string;
};
