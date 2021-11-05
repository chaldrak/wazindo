import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import {
  EditFinancementSponsorComponent,
} from "./edit-financementsponsor.component";

describe('EditFinancementSponsorComponent', () => {
  let component: EditFinancementSponsorComponent;
  let fixture: ComponentFixture<EditFinancementSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFinancementSponsorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFinancementSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
