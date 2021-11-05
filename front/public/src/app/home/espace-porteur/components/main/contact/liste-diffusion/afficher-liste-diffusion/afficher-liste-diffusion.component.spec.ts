import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherListeDiffusionComponent } from './afficher-liste-diffusion.component';

describe('AfficherListeDiffusionComponent', () => {
  let component: AfficherListeDiffusionComponent;
  let fixture: ComponentFixture<AfficherListeDiffusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherListeDiffusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherListeDiffusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
