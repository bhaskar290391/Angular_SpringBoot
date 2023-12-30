import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesProjectListComponent } from './sales-project-list.component';

describe('SalesProjectListComponent', () => {
  let component: SalesProjectListComponent;
  let fixture: ComponentFixture<SalesProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
