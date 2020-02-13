import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExhibitionsPage } from './exhibitions.page';

describe('ExhibitionsPage', () => {
  let component: ExhibitionsPage;
  let fixture: ComponentFixture<ExhibitionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExhibitionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
