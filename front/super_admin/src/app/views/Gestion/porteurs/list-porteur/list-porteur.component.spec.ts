import {
  ComponentFixture,
  TestBed,
} from "@angular/core/testing";

import { ListPorteurComponent } from "./list-porteur.component";

describe('ListPorteurComponent', () => {
  let component: ListPorteurComponent;
  let fixture: ComponentFixture<ListPorteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPorteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPorteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
