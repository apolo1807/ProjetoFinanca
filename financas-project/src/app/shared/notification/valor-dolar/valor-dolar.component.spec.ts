import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorDolarComponent } from './valor-dolar.component';

describe('ValorDolarComponent', () => {
  let component: ValorDolarComponent;
  let fixture: ComponentFixture<ValorDolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorDolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorDolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
