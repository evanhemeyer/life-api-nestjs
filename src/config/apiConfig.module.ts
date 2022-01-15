import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigService } from './apiConfig.service';
import { readFromEnvironment } from './environment';

@Module({
  imports: [ConfigModule.forRoot({ validate: readFromEnvironment })],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ApiConfigModule {}
