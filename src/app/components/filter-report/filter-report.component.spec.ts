import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterReportComponent } from './filter-report.component';

describe('FilterReportComponent', () => {
  let component: FilterReportComponent;
  let fixture: ComponentFixture<FilterReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterReportComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
