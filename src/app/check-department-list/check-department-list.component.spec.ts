import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckDepartmentListComponent } from './check-department-list.component';

describe('CheckDepartmentListComponent', () => {
  let component: CheckDepartmentListComponent;
  let fixture: ComponentFixture<CheckDepartmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckDepartmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckDepartmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
