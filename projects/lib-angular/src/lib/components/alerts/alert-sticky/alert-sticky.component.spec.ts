import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertStickyComponent } from './alert-sticky.component';

describe('AlertStickyComponent', () => {
  let component: AlertStickyComponent;
  let fixture: ComponentFixture<AlertStickyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertStickyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertStickyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
