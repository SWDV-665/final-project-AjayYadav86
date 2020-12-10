import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrshowPage } from './qrshow.page';

describe('IonicGeneratePageQrshowPage', () => {
  let component: QrshowPage;
  let fixture: ComponentFixture<QrshowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrshowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrshowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
