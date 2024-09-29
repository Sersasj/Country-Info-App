import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import {
  AvailableCountry,
  BorderCountry,
  PopulationCount,
  PopulationData,
  CountryInfo,
} from '../model/interfaces';

export class AvailableCountryDto implements AvailableCountry {
  @ApiProperty({
    description: 'Name of the country',
    example: 'United States',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ISO Alpha-2 country code',
    example: 'US',
  })
  @IsString()
  countryCode: string;
}

export class BorderCountryDto implements BorderCountry {
  @ApiProperty({
    description: 'Common name of the country',
    example: 'Belarus',
  })
  @IsString()
  commonName: string;

  @ApiProperty({
    description: 'Official name of the country',
    example: 'Republic of Belarus',
  })
  @IsString()
  officialName: string;

  @ApiProperty({
    description: 'ISO Alpha-2 country code',
    example: 'BY',
  })
  @IsString()
  countryCode: string;

  @ApiProperty({
    description: 'Region of the country',
    example: 'Europe',
  })
  @IsString()
  region: string;

  @ApiProperty({
    description: 'List of bordering country codes',
    example: ['RU', 'LT', 'PL'],
    nullable: true,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  borders: string[] | null;
}

export class PopulationCountDto implements PopulationCount {
  @ApiProperty({
    description: 'Year of the population count',
    example: 1960,
  })
  year: number;

  @ApiProperty({
    description: 'Population value',
    example: 42664652,
  })
  value: number;
}

export class PopulationDataDto implements PopulationData {
  @ApiProperty({
    description: 'Name of the country',
    example: 'Ukraine',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'ISO Alpha-3 country code',
    example: 'UKR',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'ISO Alpha-3 country code',
    example: 'UKR',
  })
  @IsString()
  iso3: string;

  @ApiProperty({
    description: 'List of population counts',
    type: [PopulationCountDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PopulationCountDto)
  populationCounts: PopulationCountDto[];
}

export class CountryFlagDto {
  @ApiProperty({
    description: 'URL of the country flag',
    example: 'https://flags.example.com/ua.png',
  })
  @IsString()
  flagUrl: string;
}

export class CountryInfoDto implements CountryInfo {
  @ApiProperty({
    description: 'Name of the country',
    example: 'Ukraine',
  })
  @IsString()
  countryName: string;
  @ApiProperty({
    description: 'List of bordering countries',
    type: [BorderCountryDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BorderCountryDto)
  borderCountries: BorderCountryDto[];

  @ApiProperty({
    description: 'Population data of the country',
    type: PopulationDataDto,
    nullable: true,
  })
  @ValidateNested()
  @Type(() => PopulationDataDto)
  populationData: PopulationDataDto | null;

  @ApiProperty({
    description: 'URL of the country flag',
    example: 'https://flags.example.com/ua.png',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  flagUrl?: string;
}
