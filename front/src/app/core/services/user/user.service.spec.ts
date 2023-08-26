import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';




beforeEach(() => {

  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule],
    providers: []
  });
});

it('Deberia crear el servicio', () => {
  const service: UserService = TestBed.inject(UserService);
  expect(service).toBeTruthy();
});
