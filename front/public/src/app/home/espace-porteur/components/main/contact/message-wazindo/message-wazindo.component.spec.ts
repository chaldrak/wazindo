import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageWazindoComponent } from './message-wazindo.component';

describe('MessageWazindoComponent', () => {
  let component: MessageWazindoComponent;
  let fixture: ComponentFixture<MessageWazindoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageWazindoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageWazindoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
