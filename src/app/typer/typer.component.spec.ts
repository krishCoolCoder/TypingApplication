import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyperComponent } from './typer.component';

describe('TyperComponent', () => {
  let component: TyperComponent;
  let fixture: ComponentFixture<TyperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TyperComponent]
    });
    fixture = TestBed.createComponent(TyperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
