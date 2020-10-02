import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTestReportComponent } from './generate-test-report.component';

describe('GenerateTestReportComponent', () => {
  let component: GenerateTestReportComponent;
  let fixture: ComponentFixture<GenerateTestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateTestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
