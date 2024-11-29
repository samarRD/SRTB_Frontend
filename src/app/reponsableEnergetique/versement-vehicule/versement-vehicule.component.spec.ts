import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersementVehiculeComponent } from './versement-vehicule.component';

describe('VersementVehiculeComponent', () => {
  let component: VersementVehiculeComponent;
  let fixture: ComponentFixture<VersementVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersementVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersementVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
