import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionProjetComponent } from './contribution-projet.component';

describe('ContributionProjetComponent', () => {
  let component: ContributionProjetComponent;
  let fixture: ComponentFixture<ContributionProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
