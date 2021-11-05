import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import { EditPubSolidaireComponent } from "./edit-pubsolidaire.component";

describe('EditPubSolidaireComponent', () => {
  let component: EditPubSolidaireComponent;
  let fixture: ComponentFixture<EditPubSolidaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPubSolidaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPubSolidaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
