import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import { EditModesPaiementComponent } from "./edit-modespaiement.component";

describe('EditModesPaiementComponent', () => {
  let component: EditModesPaiementComponent;
  let fixture: ComponentFixture<EditModesPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModesPaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditModesPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
