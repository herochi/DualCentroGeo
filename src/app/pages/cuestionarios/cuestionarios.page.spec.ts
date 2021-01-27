import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CuestionariosPage } from './cuestionarios.page';

describe('CuestionariosPage', () => {
  let component: CuestionariosPage;
  let fixture: ComponentFixture<CuestionariosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuestionariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CuestionariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
