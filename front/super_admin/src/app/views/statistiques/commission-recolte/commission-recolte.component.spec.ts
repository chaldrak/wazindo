import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import { CommissionRecolteComponent } from "./commission-recolte.component";

describe('CommissionRecolteComponent', () => {
  let component: CommissionRecolteComponent;
  let fixture: ComponentFixture<CommissionRecolteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionRecolteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionRecolteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
