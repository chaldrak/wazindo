import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorteurLayoutComponent } from './porteur-layout.component';

describe('PorteurLayoutComponent', () => {
  let component: PorteurLayoutComponent;
  let fixture: ComponentFixture<PorteurLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorteurLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorteurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
