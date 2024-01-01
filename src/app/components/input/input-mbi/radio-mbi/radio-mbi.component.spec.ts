import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RadioMbiComponent } from './radio-mbi.component';

describe('RadioMbiComponent', () => {
  let component: RadioMbiComponent;
  let fixture: ComponentFixture<RadioMbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioMbiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RadioMbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
