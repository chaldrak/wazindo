import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import {
  ListSoutienSolidaireComponent,
} from "./list-soutiensolidaire.component";

describe('ListSoutienSolidaireComponent', () => {
  let component: ListSoutienSolidaireComponent;
  let fixture: ComponentFixture<ListSoutienSolidaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSoutienSolidaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSoutienSolidaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
