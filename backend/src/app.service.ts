import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelloZealthy(): string {
    return 'Hello Zealthy!';
  }
}
