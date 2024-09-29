import { Injectable } from '@nestjs/common';
import { IEnvironmentVariables } from '../environment.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvConfigService implements IEnvironmentVariables {
  constructor(private readonly configService: ConfigService) {}

  getPort(): string {
    return this.configService.get<string>('PORT');
  }
  getNagerApiUrl(): string {
    return this.configService.get<string>('NAGER_API_URL');
  }
  getCountriesNowApiUrl(): string {
    return this.configService.get<string>('COUNTRIES_NOW_API_URL');
  }
}
