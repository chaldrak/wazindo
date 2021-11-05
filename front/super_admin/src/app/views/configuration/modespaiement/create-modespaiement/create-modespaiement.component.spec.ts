import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import { CreateModesPaiementComponent } from "./create-modespaiement.component";

describe('CreateModesPaiementComponent', () => {
  let component: CreateModesPaiementComponent;
  let fixture: ComponentFixture<CreateModesPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateModesPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateModesPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
