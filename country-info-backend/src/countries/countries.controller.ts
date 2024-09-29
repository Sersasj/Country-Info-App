import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CountriesService } from './countries.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import {
  AvailableCountryDto,
  BorderCountryDto,
  CountryFlagDto,
  CountryInfoDto,
  PopulationCountDto,
} from './dto/dtos';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @ApiResponse({
    description: 'List of available countries',
    type: [AvailableCountryDto],
  })
  @Get()
  async getAvailableCountries(): Promise<AvailableCountryDto[]> {
    try {
      return await this.countriesService.getAvailableCountries();
    } catch (error) {
      this.handleError(error);
    }
  }

  @ApiParam({
    name: 'code',
    description: 'ISO Alpha-2 country code (e.g., "UA" for Ukraine)',
    example: 'UA',
  })
  @ApiResponse({
    description: 'Detailed information about the specified country',
    type: CountryInfoDto,
  })
  @Get(':code')
  async getCountryInfo(@Param('code') code: string): Promise<CountryInfoDto> {
    try {
      return (await this.countriesService.getCountryInfo(
        code.toUpperCase(),
      )) as any;
    } catch (error) {
      this.handleError(error);
    }
  }

  @ApiParam({
    name: 'code',
    description: 'ISO Alpha-2 country code (e.g., "UA" for Ukraine)',
    example: 'UA',
  })
  @ApiResponse({
    description: 'Flag URL of the specified country',
    type: CountryFlagDto,
  })
  @Get(':code/flag')
  async getCountryFlag(@Param('code') code: string): Promise<CountryFlagDto> {
    try {
      const flagUrl = await this.countriesService.getCountryFlag(
        code.toUpperCase(),
      );
      if (!flagUrl) {
        throw new HttpException('Flag not found', HttpStatus.NOT_FOUND);
      }
      return { flagUrl };
    } catch (error) {
      this.handleError(error);
    }
  }

  @ApiParam({
    name: 'code',
    description: 'ISO Alpha-2 country code (e.g., "UA" for Ukraine)',
    example: 'UA',
  })
  @ApiResponse({
    description: 'Population data of the specified country',
    type: [PopulationCountDto],
  })
  @Get(':code/population')
  async getCountryPopulation(
    @Param('code') code: string,
  ): Promise<PopulationCountDto[]> {
    try {
      const populationData = await this.countriesService.getCountryPopulation(
        code.toUpperCase(),
      );
      if (!populationData) {
        throw new HttpException(
          'Population data not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return populationData as any;
    } catch (error) {
      this.handleError(error);
    }
  }

  @ApiParam({
    name: 'code',
    description: 'ISO Alpha-2 country code (e.g., "UA" for Ukraine)',
    example: 'UA',
  })
  @ApiResponse({
    description: 'List of bordering countries',
    type: [BorderCountryDto],
  })
  @Get(':code/borders')
  async getBorderCountries(
    @Param('code') code: string,
  ): Promise<BorderCountryDto[]> {
    try {
      const borders = await this.countriesService.getBorderCountries(
        code.toUpperCase(),
      );
      if (!borders || borders.length === 0) {
        throw new HttpException(
          'Border countries not found',
          HttpStatus.NOT_FOUND,
        );
      }
      return borders;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }
    throw new HttpException(
      error.message || 'Internal Server Error',
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
