import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import {
  ListFinancementSponsorComponent,
} from "./list-financementsponsor.component";

describe('ListFinancementSponsorComponent', () => {
  let component: ListFinancementSponsorComponent;
  let fixture: ComponentFixture<ListFinancementSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFinancementSponsorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinancementSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
