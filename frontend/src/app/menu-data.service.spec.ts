import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MenuDataService } from './menu-data.service';
import { Category } from './category';
import { Menu } from './menu';

describe('MenuDataService', () => {

  const purchasableUrl = '/kiorder/api/v1/purchasable';
  let menuDataService: MenuDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [MenuDataService]
    });

    menuDataService = TestBed.get(MenuDataService);
    httpTestingController = TestBed.get(HttpTestingController);
    spyOn(window, 'alert');
  });


  it('should be created', () => {
    const service: MenuDataService = TestBed.get(MenuDataService);
    expect(service).toBeTruthy();
  });

  it('getCategories should return stream of Categories', () => {
    const testCategory: Category = {name: 'Burgers', purchasables: []};
    const testCategories: Category[] = [testCategory];
    const testJSONResponse: any = {
      'success': true, 'data': {'list': [{'name': 'Burgers', 'purchasables': []}]}
    };

    menuDataService.getCategories().subscribe(categories => {
      // expect(typeof(categories)).toEqual(typeof(testCategories))
      expect(categories).toEqual(testCategories);
    });
    const req = httpTestingController.expectOne(purchasableUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testJSONResponse);
  });

  it('getProductInfo should return stream of Menu from given Id', () => {
    const testMenu: any = {id: 1, name: 'Hamburger', thumbnail: 'jpg', base_price: 10, options: []};
    const menuUrl = purchasableUrl + '/' + testMenu.id;
    const testJSONResponse: any = {
      'success': true,
      'data': {'id': 1, 'name': 'Hamburger', 'thumbnail': 'jpg', 'base_price': 10, 'options': []}
    };

    menuDataService.getProductInfo(testMenu.id)
      .then(purchasable => {
        expect(purchasable).toEqual(testMenu, 'data contents equal');
     });
    const req = httpTestingController.expectOne(menuUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testJSONResponse);
  });

});


