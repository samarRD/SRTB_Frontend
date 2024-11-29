import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTypeComponent } from './modifier-type.component';

describe('ModifierTypeComponent', () => {
  let component: ModifierTypeComponent;
  let fixture: ComponentFixture<ModifierTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
