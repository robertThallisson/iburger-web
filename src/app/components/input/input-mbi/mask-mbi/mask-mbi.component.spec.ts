import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaskMbiComponent } from './mask-mbi.component';

describe('MaskMbiComponent', () => {
  let component: MaskMbiComponent;
  let fixture: ComponentFixture<MaskMbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaskMbiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaskMbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
