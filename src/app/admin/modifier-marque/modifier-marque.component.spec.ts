import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMarqueComponent } from './modifier-marque.component';

describe('ModifierMarqueComponent', () => {
  let component: ModifierMarqueComponent;
  let fixture: ComponentFixture<ModifierMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierMarqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
