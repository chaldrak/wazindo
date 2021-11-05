import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import {
  CreateFinancementSponsorComponent,
} from "./create-financementsponsor.component";

describe('CreateFinancementSponsorComponent', () => {
  let component: CreateFinancementSponsorComponent;
  let fixture: ComponentFixture<CreateFinancementSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFinancementSponsorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFinancementSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
