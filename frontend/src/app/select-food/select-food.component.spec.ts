import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFoodComponent } from './select-food.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MenuDataService } from "../menu-data.service";
import { MyCartService } from "../my-cart.service";
import { Observable } from "rxjs";
import { Category } from "../category";

describe('SelectFoodComponent', () => {
  let component: SelectFoodComponent;
  let fixture: ComponentFixture<SelectFoodComponent>;
  let myCartServiceSpy
  let menuDataServiceSpy
  let testCategory$ : Observable<Category[]>

  beforeEach(async(() => {
    // Service setups
    myCartServiceSpy = jasmine.createSpyObj('MyCartService',
      ['getMyCartCount', 'emptyMyCart'])
    menuDataServiceSpy = jasmine.createSpyObj('MenuDataService', ['getCategories'])
    myCartServiceSpy.getMyCartCount.and.returnValue(1)
    testCategory$ = new Observable(categories => {})
    menuDataServiceSpy.getCategories.and.returnValue(testCategory$)

    TestBed.configureTestingModule({
      declarations: [ SelectFoodComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: MyCartService, useValue: myCartServiceSpy },
        { provide: MenuDataService, useValue: menuDataServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should call getCategories, getMyCartCount', async((()=>{
    component.ngOnInit()
    expect(menuDataServiceSpy.getCategories).toHaveBeenCalled()
    expect(myCartServiceSpy.getMyCartCount).toHaveBeenCalled()
    fixture.whenStable().then(() => {
      expect(component.myCartCount).toEqual(1)
      expect(component.categories$).toEqual(testCategory$)
    })
  })))

  it('getCategories should set category stream', ()=>{
    component.categories$ = null // initial state
    component.getCategories()
    expect(component.categories$).toEqual(testCategory$)
  })

  it('getMyCartCount should set myCartCount', ()=>{
    component.myCartCount = 0 // initial state
    component.getMyCartCount()
    expect(component.myCartCount).toEqual(1)
  })

  it('emptyCart should call myCartService.emptyMyCart', ()=>{
    component.emptyCart()
    expect(myCartServiceSpy.emptyMyCart).toHaveBeenCalled()
    expect(myCartServiceSpy.getMyCartCount).toHaveBeenCalled()
  })
});
