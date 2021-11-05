import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import {
  ContributionPaiementComponent,
} from './contribution-paiement.component';

describe('ContributionPaiementComponent', () => {
  let component: ContributionPaiementComponent;
  let fixture: ComponentFixture<ContributionPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContributionPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
