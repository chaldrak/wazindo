import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFirstProductComponent } from './modalfirstproduct.component';

describe('ModalFirstProductComponent', () => {
  let component: ModalFirstProductComponent;
  let fixture: ComponentFixture<ModalFirstProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFirstProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFirstProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
