import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListObserverComponent } from './product-list-observer.component';

describe('ProductListObserverComponent', () => {
  let component: ProductListObserverComponent;
  let fixture: ComponentFixture<ProductListObserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListObserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListObserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
