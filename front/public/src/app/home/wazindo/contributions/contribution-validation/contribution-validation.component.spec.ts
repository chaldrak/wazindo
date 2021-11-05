import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionValidationComponent } from './contribution-validation.component';

describe('ContributionValidationComponent', () => {
  let component: ContributionValidationComponent;
  let fixture: ComponentFixture<ContributionValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
