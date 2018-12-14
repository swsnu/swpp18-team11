import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerMenuComponent } from './hamburger-menu.component';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';
import { DEFAULT_IMPORTS } from '../testing';
import { EventEmitter } from '@angular/core';

describe('HamburgerMenuComponent', () => {
  let component: HamburgerMenuComponent;
  let fixture: ComponentFixture<HamburgerMenuComponent>;
  let testUser: User;
  let userServiceSpy;
  let routerSpy;
  const eventEmitter = new EventEmitter<boolean>();

  beforeEach(async(() => {
    testUser = new User('id', 'userName', 'type');
    userServiceSpy = jasmine.createSpyObj('UserService',
      ['getCurrentUser', 'signOut']);
    userServiceSpy.getCurrentUser.and.returnValue(testUser);
    userServiceSpy.signOut.and.returnValue(new Promise(() => true));
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ HamburgerMenuComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userServiceSpy },
      ],
      imports: [
        ...DEFAULT_IMPORTS
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburgerMenuComponent);
    component = fixture.componentInstance;
    component.sideNavOpenEvent = eventEmitter;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    // component should call getCurrentUser when initialized
    expect(userServiceSpy.getCurrentUser).toHaveBeenCalled();
  });

  it('isLoggedIn should return user logged In', () => {
    component.user = null;
    expect(component.isLoggedIn()).toEqual(false);
    component.user = testUser;
    expect(component.isLoggedIn()).toEqual(true);
  });

  it('signOut should signOut', () => {
    component.signOut();
    expect(userServiceSpy.signOut).toHaveBeenCalled();
  });

});
