import { Injectable } from '@nestjs/common';
import { cities } from 'src/core/domain/profile/static/cities.static';

@Injectable()
export class ProfileService {
  async get() {
    console.log(cities);
  }
}
