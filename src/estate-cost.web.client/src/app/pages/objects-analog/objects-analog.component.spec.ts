import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsAnalogComponent } from './objects-analog.component';

describe('ObjectsAnalogComponent', () => {
  let component: ObjectsAnalogComponent;
  let fixture: ComponentFixture<ObjectsAnalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectsAnalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsAnalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
