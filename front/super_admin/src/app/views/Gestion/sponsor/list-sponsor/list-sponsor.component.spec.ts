import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import { ListSponsorComponent } from "./list-financementsponsor.component";

describe('ListSponsorComponent', () => {
  let component: ListSponsorComponent;
  let fixture: ComponentFixture<ListSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSponsorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
