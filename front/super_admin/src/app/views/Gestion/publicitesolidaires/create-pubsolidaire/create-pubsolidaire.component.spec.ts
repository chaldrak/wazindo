import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import { CreatePubSolidaireComponent } from "./create-pubsolidaire.component";

describe('CreatePubSolidaireComponent', () => {
  let component: CreatePubSolidaireComponent;
  let fixture: ComponentFixture<CreatePubSolidaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePubSolidaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePubSolidaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
