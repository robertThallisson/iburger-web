import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataInputComponent } from './data-input.component';

describe('DataInputComponent', () => {
  let component: DataInputComponent;
  let fixture: ComponentFixture<DataInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInputComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
