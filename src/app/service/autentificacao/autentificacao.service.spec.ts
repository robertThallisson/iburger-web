import { TestBed } from '@angular/core/testing';

import { AutentificacaoService } from './autentificacao.service';

describe('AutentificacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutentificacaoService = TestBed.get(AutentificacaoService);
    expect(service).toBeTruthy();
  });
});
