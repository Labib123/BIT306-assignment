import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordNewTestComponent } from './record-new-test.component';


describe('RecordNewTestComponent', () => {
  let component: RecordNewTestComponent;
  let fixture: ComponentFixture<RecordNewTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordNewTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordNewTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
