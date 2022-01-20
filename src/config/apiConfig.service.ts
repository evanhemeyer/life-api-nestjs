import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from './environment';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService<Environment>) {}

  get isOffline(): boolean {
    return this.configService.get('IS_OFFLINE') === 'true';
  }

  get dynamoDbRegion(): string {
    return this.configService.get('DYNAMO_DB_REGION');
  }

  get dynamoDbHost(): string {
    return this.configService.get('DYNAMO_DB_HOST');
  }

  get level(): string {
    return this.configService.get('LEVEL');
  }

  get plaidSecret(): string {
    return this.configService.get('PLAID_SECRET');
  }

  get plaidClientId(): string {
    return this.configService.get('PLAID_CLIENT_ID');
  }

  get plaidEnv(): string {
    return this.configService.get('PLAID_ENV');
  }
}
