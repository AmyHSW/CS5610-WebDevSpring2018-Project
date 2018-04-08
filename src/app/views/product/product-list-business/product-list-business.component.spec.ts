import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListBusinessComponent } from './product-list-business.component';

describe('ProductListBusinessComponent', () => {
  let component: ProductListBusinessComponent;
  let fixture: ComponentFixture<ProductListBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
