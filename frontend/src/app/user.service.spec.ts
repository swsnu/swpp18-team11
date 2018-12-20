import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { DEFAULT_IMPORTS } from './testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Purchasable } from './purchasable';
import { Router } from '@angular/router';
import { Store } from './store';

describe('UserService', () => {
  let service: UserService;
  let httpStub: HttpClient;
  let router: Router;
  let currentUser;
  let usernameList: string[];
  let passwordMap;
  let currentStoreMap;
  const DEFAULT_USERNAME = 'user';
  const DEFAULT_PW = 'password';
  const storeMock = {
    id: 1, name: 's', location: {lng: 0, lat: 0}, franchiseId: 1, franchise_id: 1, timezone: ''
  };
  const purchasableMock = new Purchasable({
    id: 1, name: 'p', thumbnail: null, base_price: 1, quantity: 1,
    total_price: 1, options: [], badges: []
  });
  const txMock = {
    purchasable: purchasableMock,
    purchasable_name: purchasableMock.name,
    purchasable_base_price: purchasableMock.base_price,
    qty: purchasableMock.quantity,
    price: purchasableMock.total_price,
    options: [],
    total_price: purchasableMock.total_price,
    created_at: '',
    state: ''
  };
  const success = function(data) {
    return {success: true, data: data};
  };
  const fail = function(data) {
    return {success: false, data: data};
  };
  const signUpStub = function(body) {
    const username: string = body.get('username');
    const password: string = body.get('password');
    if (usernameList.includes(username)) {
      return of(fail(null));
    } else {
      usernameList.push(username);
      passwordMap[username] = password;
      return of(success({user_id: 1, username: username, user_type: 'customer'}));
    }
  };
  const signInStub = function(body) {
    const username: string = body.get('username');
    const password: string = body.get('password');
    if (usernameList.includes(username) && passwordMap[username] === password) {
      return of(success({user_id: '1', username: username, user_type: 'customer'}));
    } else {
      return of(fail(null));
    }
  };
  const signOutStub = function() {
    if (currentUser !== null) {
      return of(success(null));
    } else {
      return of(fail(null));
    }
  };
  const testTxStub = function() {
    if (currentUser !== null) {
      return of(success([txMock]));
    } else {
      return of(fail(null));
    }
  };
  const setCurrentStoreStub = function(body) {
    const storeId = body.get('store_id');
    if (currentUser !== null) {
      const username = currentUser.username;
      currentStoreMap[username] = storeId;
      return of(success(storeMock));
    } else {
      return of(fail(null));
    }
  };
  const getCurrentStoreStub = function() {
    if (currentUser !== null) {
      return of(success(currentStoreMap[currentUser.username]));
    } else {
      return of(fail(null));
    }
  };
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ...DEFAULT_IMPORTS,
      RouterTestingModule
    ]
  }));

  beforeEach((done) => {
    service = TestBed.get(UserService);
    httpStub = TestBed.get(HttpClient);
    router = TestBed.get(Router);
    currentUser = null;
    usernameList = [];
    passwordMap = {};
    currentStoreMap = {};

    spyOn(router, 'navigateByUrl').and.callFake((x) => {});
    spyOn(service, 'setCurrentUser').and.callFake((user) => {
      currentUser = user;
    });
    spyOn(service, 'getCurrentUser').and.callFake(() => {
      return currentUser;
    });
    spyOn(service, 'handleError').and.callFake(e => e);
    spyOn(httpStub, 'post').and.callFake((url, body) => {
      switch (url) {
        case '/kiorder/api/v1/user/sign_up':
          return signUpStub(body);
        case '/kiorder/api/v1/user/sign_in':
          return signInStub(body);
        case '/kiorder/api/v1/user/current_store':
          return setCurrentStoreStub(body);
        default:
          return 0;
      }
    });
    spyOn(httpStub, 'get').and.callFake((url) => {
      switch (url) {
        case '/kiorder/api/v1/user/sign_out':
          return signOutStub();
        case '/kiorder/api/v1/user/current_store':
          return getCurrentStoreStub();
        case '/kiorder/api/v1/test_tx':
          return testTxStub();
        default:
          return 0;
      }
    });
    service.signUp(DEFAULT_USERNAME, DEFAULT_PW);
    done();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up', () => {
    const username = 'user1';
    const password = 'password1';
    service.signUp(username, password).then(response => {
      service.signIn(username, password).then(() => {
          expect(service.getCurrentUser()).toBeDefined();
          expect(service.getCurrentUser().username).toBe(username);
      });
    });
  });

  it('should sign in/out', () => {
    service.signIn(DEFAULT_USERNAME, DEFAULT_PW).then(() => {
      expect(service.getCurrentUser()).toBeDefined();
      expect(service.getCurrentUser().username).toBe(DEFAULT_USERNAME);
      service.signOut().then(() => {
        expect(service.getCurrentUser()).toBeNull();
      });
    });
  });

  it('should set/get current store', () => {
    service.signIn(DEFAULT_USERNAME, DEFAULT_PW).then(() => {
      service.setCurrentStore(new Store(storeMock)).then(() => {
        service.getCurrentStore().then(store => {
          expect(store).toBeDefined();
          expect(store.id).toBe(1);
          expect(store.name).toBe('s');
        });
      });
    });
  });

/*
  it('should get my tx list', (done) => {
    spyOn(service, 'loadTxItem').and.callThrough();

    service.getMyTx().pipe(map((x) => {
      alert(x); return x;
    }));
    done();
    expect(service.loadTxItem).toHaveBeenCalledTimes(2);


    expect(txItems.length).toBe(1);
    expect(txItems[0].purchasableName).toBe('p');
  });*/
  it('should loadTxItem', () => {
    spyOn(service, 'loadTxItem').and.callThrough();
    const myTxItem = service.loadTxItem(txMock);
    expect(myTxItem).toBeDefined();
    expect(myTxItem.purchasableName).toBe('p');
  });
});
