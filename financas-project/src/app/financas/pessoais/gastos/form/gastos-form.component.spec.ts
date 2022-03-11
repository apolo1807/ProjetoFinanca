import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosFormComponent } from './gastos-form.component';

describe('GastosFormComponent', () => {
  let component: GastosFormComponent;
  let fixture: ComponentFixture<GastosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastosFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
