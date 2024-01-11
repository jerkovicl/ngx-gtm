import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxGtmComponent } from './ngx-gtm.component';

describe('NgxGtmComponent', () => {
  let component: NgxGtmComponent;
  let fixture: ComponentFixture<NgxGtmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxGtmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxGtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
