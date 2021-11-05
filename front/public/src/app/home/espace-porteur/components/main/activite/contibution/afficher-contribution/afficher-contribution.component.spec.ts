import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherContributionComponent } from './afficher-contribution.component';

describe('AfficherContributionComponent', () => {
  let component: AfficherContributionComponent;
  let fixture: ComponentFixture<AfficherContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherContributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
