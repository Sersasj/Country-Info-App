import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from '../env-config.service';
import { EnvConfigModule } from '../env-config.module';

describe('EnvConfigService', () => {
  let sut: EnvConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EnvConfigModule.forRoot()],
      providers: [EnvConfigService],
    }).compile();

    sut = module.get<EnvConfigService>(EnvConfigService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('get environment vars ', () => {
    it('should return a port', () => {
      const port = sut.getPort();
      expect(port).toBeDefined();
    });

    it('should return a Nager API URL', () => {
      const nagerApiUrl = sut.getNagerApiUrl();
      expect(nagerApiUrl).toBeDefined();
    });

    it('should return a Countries Now API URL', () => {
      const countriesNowApiUrl = sut.getCountriesNowApiUrl();
      expect(countriesNowApiUrl).toBeDefined();
    });
  });
});
