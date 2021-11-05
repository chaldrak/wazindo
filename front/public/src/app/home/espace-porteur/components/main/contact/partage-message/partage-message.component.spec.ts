import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageMessagerieComponent } from './partage-message.component';

describe('PartageMessagerieComponent', () => {
  let component: PartageMessagerieComponent;
  let fixture: ComponentFixture<PartageMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartageMessagerieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartageMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
