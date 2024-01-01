import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomListModalPage } from './custom-list-modal.page';

describe('CustomListModalPage', () => {
  let component: CustomListModalPage;
  let fixture: ComponentFixture<CustomListModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomListModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomListModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
