import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaFixaComponent } from './renda-form.component';

describe('RendaFixaComponent', () => {
  let component: RendaFixaComponent;
  let fixture: ComponentFixture<RendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendaFixaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
