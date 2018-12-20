import { TestBed } from '@angular/core/testing';

import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.get(UrlService);
    }
  );

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isUrlStore should check if url is store', ()=>{
    expect(service.isUrlStore(null)).toEqual(false);
    expect(service.isUrlStore('mycart')).toEqual(true);
    expect(service.isUrlStore('meah')).toEqual(false);
  });

  it('getPageTitle should return page title of given url', ()=>{
    expect(service.getPageTitle(null)).toEqual('');
    expect(service.getPageTitle('order')).toEqual('KingBurger');
    expect(service.getPageTitle('sign-in')).toEqual('Sign In');
    expect(service.getPageTitle('sign-up')).toEqual('Sign Up');
    expect(service.getPageTitle('store')).toEqual('Select Store!');
    expect(service.getPageTitle('my-order')).toEqual('My Orders');
    expect(service.getPageTitle('meah')).toEqual('Not a valid page');
  });
});
