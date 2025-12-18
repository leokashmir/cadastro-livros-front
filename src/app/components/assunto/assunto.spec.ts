import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assunto } from './assunto';

describe('Assunto', () => {
  let component: Assunto;
  let fixture: ComponentFixture<Assunto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assunto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assunto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
