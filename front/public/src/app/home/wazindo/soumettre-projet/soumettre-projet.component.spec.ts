import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoumettreProjetComponent } from './soumettre-projet.component';

describe('SoumettreProjetComponent', () => {
  let component: SoumettreProjetComponent;
  let fixture: ComponentFixture<SoumettreProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoumettreProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoumettreProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
