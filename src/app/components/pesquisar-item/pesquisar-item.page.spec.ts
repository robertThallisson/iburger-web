import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PesquisarItemPage } from './pesquisar-item.page';

describe('PesquisarItemPage', () => {
  let component: PesquisarItemPage;
  let fixture: ComponentFixture<PesquisarItemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisarItemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PesquisarItemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
