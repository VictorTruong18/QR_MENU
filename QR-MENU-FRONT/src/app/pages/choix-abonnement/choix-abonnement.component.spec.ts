import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixAbonnementComponent } from './choix-abonnement.component';

describe('ChoixAbonnementComponent', () => {
  let component: ChoixAbonnementComponent;
  let fixture: ComponentFixture<ChoixAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoixAbonnementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
