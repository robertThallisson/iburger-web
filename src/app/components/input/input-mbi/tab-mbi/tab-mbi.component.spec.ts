import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabMbiComponent } from './tab-mbi.component';

describe('TabMbiComponent', () => {
  let component: TabMbiComponent;
  let fixture: ComponentFixture<TabMbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMbiComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabMbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
