import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcrireContributeurComponent } from './ecrire-contributeur.component';

describe('EcrireContributeurComponent', () => {
  let component: EcrireContributeurComponent;
  let fixture: ComponentFixture<EcrireContributeurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcrireContributeurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcrireContributeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
