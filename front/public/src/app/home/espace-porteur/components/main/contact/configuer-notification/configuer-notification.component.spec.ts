import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguerNotificationComponent } from './configuer-notification.component';

describe('ConfiguerNotificationComponent', () => {
  let component: ConfiguerNotificationComponent;
  let fixture: ComponentFixture<ConfiguerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguerNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
