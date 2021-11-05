import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerListeDiffusionComponent } from './creer-liste-diffusion.component';

describe('CreerListeDiffusionComponent', () => {
  let component: CreerListeDiffusionComponent;
  let fixture: ComponentFixture<CreerListeDiffusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerListeDiffusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerListeDiffusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
