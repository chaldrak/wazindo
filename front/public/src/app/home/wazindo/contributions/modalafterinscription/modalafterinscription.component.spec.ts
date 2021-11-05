import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {
  ModalAfterInscriptionComponent,
} from './modalafterinscription.component';

describe('ModalAfterInscriptionComponent', () => {
  let component: ModalAfterInscriptionComponent;
  let fixture: ComponentFixture<ModalAfterInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAfterInscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAfterInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
