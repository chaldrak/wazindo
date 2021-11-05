import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { PubSolidaireComponent } from './pub-solidaire.component';

describe('PubSolidaireComponent', () => {
  let component: PubSolidaireComponent;
  let fixture: ComponentFixture<PubSolidaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PubSolidaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PubSolidaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
