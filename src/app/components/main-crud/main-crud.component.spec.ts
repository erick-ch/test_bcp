import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCrudComponent } from './main-crud.component';

describe('MainCrudComponent', () => {
  let component: MainCrudComponent;
  let fixture: ComponentFixture<MainCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
