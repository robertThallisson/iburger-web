import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputMbiComponent } from './input-mbi.component';

describe('InputMbiComponent', () => {
  let component: InputMbiComponent;
  let fixture: ComponentFixture<InputMbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputMbiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputMbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
