import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { ModalSoutenirProjetComponent } from './modalsoutenirprojet.component';

describe('ModalSoutenirProjetComponent', () => {
  let component: ModalSoutenirProjetComponent;
  let fixture: ComponentFixture<ModalSoutenirProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSoutenirProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSoutenirProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
