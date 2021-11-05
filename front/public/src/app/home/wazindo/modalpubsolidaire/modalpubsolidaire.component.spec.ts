import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { ModalPubSolidaireComponent } from './modalpubsolidaire.component';

describe('ModalPubSolidaireComponent', () => {
  let component: ModalPubSolidaireComponent;
  let fixture: ComponentFixture<ModalPubSolidaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPubSolidaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPubSolidaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
