import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierArretComponent } from './modifier-arret.component';

describe('ModifierArretComponent', () => {
  let component: ModifierArretComponent;
  let fixture: ComponentFixture<ModifierArretComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierArretComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierArretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
