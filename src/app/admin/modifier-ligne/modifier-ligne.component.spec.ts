import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierLigneComponent } from './modifier-ligne.component';

describe('ModifierLigneComponent', () => {
  let component: ModifierLigneComponent;
  let fixture: ComponentFixture<ModifierLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierLigneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
