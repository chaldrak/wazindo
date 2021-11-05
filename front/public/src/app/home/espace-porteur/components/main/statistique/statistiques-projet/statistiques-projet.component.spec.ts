import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiquesProjetComponent } from './statistiques-projet.component';

describe('StatistiquesProjetComponent', () => {
  let component: StatistiquesProjetComponent;
  let fixture: ComponentFixture<StatistiquesProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatistiquesProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatistiquesProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
