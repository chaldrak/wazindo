import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherContributeurComponent } from './afficher-contributeur.component';

describe('AfficherContributeurComponent', () => {
  let component: AfficherContributeurComponent;
  let fixture: ComponentFixture<AfficherContributeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherContributeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherContributeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
