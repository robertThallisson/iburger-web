import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilUsuarioInserirPage } from './perfil-usuario-inserir.page';

describe('PerfilUsuarioInserirPage', () => {
  let component: PerfilUsuarioInserirPage;
  let fixture: ComponentFixture<PerfilUsuarioInserirPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioInserirPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilUsuarioInserirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
