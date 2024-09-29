import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { EnvConfigModule } from '../config/environment/env-config/env-config.module';

@Module({
  imports: [EnvConfigModule, HttpModule],
  providers: [CountriesService],
  controllers: [CountriesController],
})
export class CountriesModule {}
