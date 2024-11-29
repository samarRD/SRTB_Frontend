import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rapport3Component } from './rapport3.component';

describe('Rapport3Component', () => {
  let component: Rapport3Component;
  let fixture: ComponentFixture<Rapport3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Rapport3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rapport3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
