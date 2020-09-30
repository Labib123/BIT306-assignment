import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordNewTestkitComponent } from './record-new-testkit.component';


describe('RecordNewTestkitComponent', () => {
  let component: RecordNewTestkitComponent;
  let fixture: ComponentFixture<RecordNewTestkitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordNewTestkitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordNewTestkitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
