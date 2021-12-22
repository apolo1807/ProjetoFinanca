import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendaListComponent } from './renda-list.component';

describe('RendaListComponent', () => {
  let component: RendaListComponent;
  let fixture: ComponentFixture<RendaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RendaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
