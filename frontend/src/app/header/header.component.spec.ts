import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { DEFAULT_DUMB_IMPORTS, DEFAULT_IMPORTS } from '../testing';
import { UserService } from '../user.service';
import { UrlService } from "../url.service";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceSpy;
  let urlServiceSpy;

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['signOut']);
    urlServiceSpy = jasmine.createSpyObj('UrlService',
      ['getPageTitle', 'isUrlStore']);
    TestBed.configureTestingModule({
      imports: [...DEFAULT_IMPORTS, ...DEFAULT_DUMB_IMPORTS],
      declarations: [ HeaderComponent ],
      providers: [
        {provide: UserService, useValue: userServiceSpy },
        {provide: UrlService, useValue: urlServiceSpy },
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('header sign-out call userService sign-out', () => {
    component.signOut();
    expect(userServiceSpy.signOut).toHaveBeenCalled();
  });
});
