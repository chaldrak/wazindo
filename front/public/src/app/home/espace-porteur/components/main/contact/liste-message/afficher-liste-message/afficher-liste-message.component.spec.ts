import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherListeMessageComponent } from './afficher-liste-message.component';

describe('AfficherListeMessageComponent', () => {
  let component: AfficherListeMessageComponent;
  let fixture: ComponentFixture<AfficherListeMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherListeMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherListeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
