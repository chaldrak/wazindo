import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { ModalErrorProjetComponent } from './modalerrorprojet.component';

describe('ModalErrorProjetComponent', () => {
  let component: ModalErrorProjetComponent;
  let fixture: ComponentFixture<ModalErrorProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalErrorProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalErrorProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
